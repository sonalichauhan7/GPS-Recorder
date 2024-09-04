import React from 'react';
import { FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { AppColors } from '../../constants/app.colors';
import styles from './styles';
import { AppStrings } from '../../utils/strings';
import Header from '../../components/header';
import { AppPngImages } from '../../constants/app.images';
import { DashboardController, ICoordinates } from './controller';
import CoordinateItem from '../../components/coordinateItem';
import Loader from '../../components/loader';
import DeleteModal from '../../components/deleteModal';
import AddressModal from '../../components/addressModal';

export const Dashboard = () => {

    const { coordinates, isLoading, isDeleteModal, deleteCoordinateId, isAddressModal, address,
        onAddPress, fetchAddress, handleDeleteCoordinate, showDeleteModal, closeDeleteModal, showAddressModal, closeAddressModal } = DashboardController();

    const renderCoordinateHeader = () => <Text style={styles.coHeader}>{AppStrings.dashboard.coordinates}</Text>

    const renderEmptyContainer = () => {
        return (
            <View style={styles.emptyContainer}>
                <Image source={AppPngImages.IcEmpty} resizeMode={"contain"} style={styles.emptyImg} />
                <Text style={styles.welcomeTxt}>{AppStrings.dashboard.welcome_gps}</Text>
                <Text style={styles.gpsEmptyTxt}>{AppStrings.dashboard.empty_store}</Text>
            </View>
        )
    }

    const renderAddButton = () => {
        return (
            <TouchableOpacity style={styles.addContainer} activeOpacity={0.9} onPress={onAddPress}>
                <Image source={AppPngImages.IcAdd} resizeMode={"contain"} style={styles.addImg} />
            </TouchableOpacity>
        )
    }

    const renderSeparator = () => <View style={styles.separator} />

    const renderCoordinatesList = ({ item, index }: { item: ICoordinates, index: number }) => {
        return (
            <CoordinateItem
                item={item}
                index={index}
                onItemClick={fetchAddress}
                onDeleteClick={showDeleteModal}
            />
        )
    }

    return (
        <SafeAreaView
            style={styles.saContainer}
            forceInset={{ top: 'always', bottom: 'never' }}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={AppColors.white}
                translucent={true}
            />
            <Header />
            {renderCoordinateHeader()}
            <View style={styles.mainContainer}>
                <FlatList
                    data={coordinates}
                    renderItem={renderCoordinatesList}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ItemSeparatorComponent={renderSeparator}
                    ListEmptyComponent={renderEmptyContainer}
                />
                {renderAddButton()}
            </View>
            <DeleteModal
                isVisible={isDeleteModal}
                closeDeleteModal={closeDeleteModal}
                deleteCoordinateId={deleteCoordinateId}
                onDelete={handleDeleteCoordinate}
            />
            <AddressModal
                isVisible={isAddressModal}
                closeAddressModal={closeAddressModal}
                address={address}
            />
            <Loader isLoading={isLoading} />
        </SafeAreaView>
    )
}