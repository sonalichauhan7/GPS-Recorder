import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import { AppColors } from '../constants/app.colors';
import { AppSizes } from '../utils/sizes';
import { AppStrings } from '../utils/strings';
import { AppFonts } from '../constants/app.fonts';

interface IProps {
    isVisible: boolean;
    address: string;
    closeAddressModal: () => void;
}

function AddressModal({ isVisible, address, closeAddressModal }: IProps): JSX.Element {

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                animationType="fade"
                visible={isVisible}
                onRequestClose={closeAddressModal}>
                <TouchableWithoutFeedback onPress={closeAddressModal}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.title}>{AppStrings.addressModal.your_address}</Text>
                            <Text style={styles.address}>{address}</Text>
                            <TouchableOpacity onPress={closeAddressModal} activeOpacity={0.9} style={styles.okContainer}>
                                <Text style={styles.ok}>{AppStrings.addressModal.ok}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

export default AddressModal;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: AppColors.blackOp,
    },
    modalContainer: {
        width: AppSizes.smartWidthScale(300),
        padding: AppSizes.smartScale(20),
        backgroundColor: AppColors.whiteOne,
        borderRadius: AppSizes.countPixelRatio(15)
    },
    title: {
        color: AppColors.black,
        fontSize: AppSizes.countPixelRatio(15),
        fontFamily: AppFonts.SEMI_BOLD,
        lineHeight: AppSizes.countPixelRatio(22),
        fontWeight: "400",
        textAlign: "center"
    },
    address: {
        color: AppColors.black,
        fontSize: AppSizes.countPixelRatio(15),
        fontFamily: AppFonts.REGULAR,
        lineHeight: AppSizes.countPixelRatio(22),
        fontWeight: "400",
        textAlign: "center",
        marginTop: AppSizes.smartScale(10)
    },
    okContainer: {
        marginTop: AppSizes.smartScale(20),
        paddingHorizontal: AppSizes.smartWidthScale(25),
        alignSelf: "flex-end"
    },
    ok: {
        color: AppColors.deepBlue,
        fontSize: AppSizes.countPixelRatio(15),
        fontFamily: AppFonts.SEMI_BOLD,
        lineHeight: AppSizes.countPixelRatio(22),
        fontWeight: "400",
    }
});
