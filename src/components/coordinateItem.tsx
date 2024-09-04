import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppSizes } from '../utils/sizes';
import { AppColors } from '../constants/app.colors';
import { ICoordinates } from '../screens/Dashboard/controller';
import { AppPngImages } from '../constants/app.images';
import { AppFonts } from '../constants/app.fonts';

interface ICoordinateItem {
    item: ICoordinates;
    index: number;
    onItemClick: (lat: number, lng: number) => void;
    onDeleteClick: (index: number) => void;
}

function CoordinateItem({ item, index, onItemClick, onDeleteClick }: ICoordinateItem): JSX.Element {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onItemClick(item.latitude, item.longitude)} activeOpacity={0.9}>
            <View style={styles.innerContainer}>
                <Image source={AppPngImages.IcOneDrive} resizeMode={"contain"} style={styles.oneDrive} />
                <Text ellipsizeMode={"tail"} numberOfLines={1} style={styles.coordinates}>{`${item.latitude}, ${item.longitude}`}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onDeleteClick(index)}>
                <Image source={AppPngImages.IcTrash} resizeMode={"contain"} style={styles.trash} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

export default React.memo(CoordinateItem);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: AppSizes.smartScale(15),
        paddingLeft: AppSizes.smartWidthScale(10),
        paddingRight: AppSizes.smartWidthScale(20),
    },
    innerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    oneDrive: {
        height: AppSizes.smartScale(25),
        width: AppSizes.smartWidthScale(35)
    },
    trash: {
        height: AppSizes.smartScale(20),
        width: AppSizes.smartWidthScale(20)
    },
    coordinates: {
        color: AppColors.black,
        fontSize: AppSizes.countPixelRatio(15),
        fontFamily: AppFonts.REGULAR,
        lineHeight: AppSizes.countPixelRatio(22.5),
        fontWeight: "400",
        width: AppSizes.smartWidthScale(170),
        marginLeft: AppSizes.smartWidthScale(17)
    }
})