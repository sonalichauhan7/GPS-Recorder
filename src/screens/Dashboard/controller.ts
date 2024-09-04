import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStrings } from "../../utils/strings";
import { AppConstants } from "../../constants/app.constants";

export interface ICoordinates {
    latitude: number;
    longitude: number;
}

export const DashboardController = () => {
    const [coordinates, setCoordinates] = useState<ICoordinates[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [deleteCoordinateId, setDeleteCoordinateId] = useState<string>("");
    const [isDeleteModal, setDeleteModal] = useState<boolean>(false);
    const [isAddressModal, setAddressModal] = useState<boolean>(false);
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        loadCoordinates();
    }, []);

    useEffect(() => {
        storeCoordinates();
    }, [coordinates]);

    const loadCoordinates = async () => {
        try {
            const existingCoordinates = await AsyncStorage.getItem(AppConstants.PREF_COORDINATES);
            const coordinatesList = existingCoordinates != null ? JSON.parse(existingCoordinates) : [];

            setCoordinates(coordinatesList);
        } catch (err) {
            console.log(err)
        }
    };

    const storeCoordinates = async () => {
        try {
            await AsyncStorage.setItem(AppConstants.PREF_COORDINATES, JSON.stringify(coordinates));
        } catch (err) {
            console.log(err)
        }
    };

    const onAddPress = () => {
        checkPermission();
    }

    const checkPermission = async () => {
        try {
            const permission = Platform.OS === "ios"
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

            const result = await check(permission);

            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('Feature not available on this device.');
                    break;

                case RESULTS.DENIED:
                    requestLocationPermission();
                    break;

                case RESULTS.LIMITED:
                    console.log('Permission granted with limitations.');
                    break;

                case RESULTS.GRANTED:
                    getCurrentLocation();
                    break;

                case RESULTS.BLOCKED:
                    showAlert();
                    break;
            }
        } catch (error) {
            console.log("In catch block=====>", error);
        }
    };

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const enableResult = await promptForEnableLocationIfNeeded();
                console.log('enableResult', enableResult);
                await getCurrentLocation();
            } catch (error: any) {
                console.error(error.message);
            }
        } else {
            const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (result === RESULTS.GRANTED) {
                getCurrentLocation();
            } else {
                showAlert();
            }
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                    latitude: latitude,
                    longitude: longitude,
                };
                setCoordinates([...coordinates, newCoordinate]);
            },
            async error => {
                if (error.code === 1) {
                    showAlert();
                } else if (error.code === 2) {
                    requestLocationPermission();
                }
            },
            // { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
        );
    }

    const showAlert = () => {
        Alert.alert(
            AppStrings.dashboard.need_permission,
            AppStrings.dashboard.desc_permission,
            [{ text: AppStrings.dashboard.goToSettings, onPress: () => openSettings() }],
            { cancelable: false },
        );
    };

    const fetchAddress = async (latitude: number, longitude: number) => {
        setLoading(true);
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    latlng: `${latitude},${longitude}`,
                    key: 'AIzaSyCWLt7_39xXt3FWeSP_JYjTo4m1Vx6olm4',
                },
            });

            if (response.data.status === 'OK') {
                const address = response.data.results[0].formatted_address;
                setAddress(address);
                showAddressModal()
                // Alert.alert('Address', address);
            } else {
                Alert.alert('Error', 'Unable to fetch address');
            }
            setLoading(false);
        } catch (error) {
            Alert.alert('Error', 'An error occurred while fetching the address');
            setLoading(false);
        }
    };

    const showDeleteModal = (index: number) => {
        setDeleteCoordinateId(index.toString())
        setDeleteModal(true)
    }

    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    const handleDeleteCoordinate = (index: number) => {
        const updatedCoordinates = coordinates.filter((item, i) => i !== index);
        setCoordinates(updatedCoordinates);
        setDeleteModal(false)
    }

    const showAddressModal = () => {
        setAddressModal(true)
    }

    const closeAddressModal = () => {
        setAddressModal(false)
    }

    return {
        coordinates,
        isLoading,
        isDeleteModal,
        deleteCoordinateId,
        isAddressModal,
        address,
        onAddPress,
        fetchAddress,
        handleDeleteCoordinate,
        showDeleteModal,
        closeDeleteModal,
        showAddressModal,
        closeAddressModal
    }
}