import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import { AppColors } from '../constants/app.colors';
import { AppSizes } from '../utils/sizes';
import { AppStrings } from '../utils/strings';
import { AppFonts } from '../constants/app.fonts';

interface IProps {
    isVisible: boolean;
    closeDeleteModal: () => void;
    deleteCoordinateId: string;
    onDelete: (id: number) => void;
}

function DeleteModal({ isVisible, deleteCoordinateId, closeDeleteModal, onDelete }: IProps): JSX.Element {

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                animationType="fade"
                visible={isVisible}
                onRequestClose={closeDeleteModal}>
                <TouchableWithoutFeedback onPress={closeDeleteModal}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.title}>{AppStrings.deleteModal.title}</Text>
                            <Text style={styles.warning}>{AppStrings.deleteModal.warning}</Text>
                            <View style={styles.rowContainer}>
                                <TouchableOpacity onPress={closeDeleteModal} activeOpacity={0.9}>
                                    <Text style={styles.cancel}>{AppStrings.deleteModal.cancel}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onDelete(Number(deleteCoordinateId))} activeOpacity={0.9}>
                                    <Text style={styles.delete}>{AppStrings.deleteModal.delete}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

export default DeleteModal;

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
        height: AppSizes.smartScale(130),
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
    warning: {
        color: AppColors.black,
        fontSize: AppSizes.countPixelRatio(15),
        fontFamily: AppFonts.REGULAR,
        lineHeight: AppSizes.countPixelRatio(22),
        fontWeight: "400",
        textAlign: "center",
        marginTop: AppSizes.smartScale(10)
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: AppSizes.smartScale(20),
        paddingHorizontal: AppSizes.smartWidthScale(25)
    },
    cancel: {
        color: AppColors.deepBlue,
        fontSize: AppSizes.countPixelRatio(15),
        fontFamily: AppFonts.MEDIUM,
        lineHeight: AppSizes.countPixelRatio(22),
        fontWeight: "400",
    },
    delete: {
        color: AppColors.red,
        fontSize: AppSizes.countPixelRatio(15),
        fontFamily: AppFonts.MEDIUM,
        lineHeight: AppSizes.countPixelRatio(22),
        fontWeight: "400",
    }
});
