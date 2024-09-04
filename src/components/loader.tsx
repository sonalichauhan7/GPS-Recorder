import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View, } from 'react-native';
import { AppColors } from '../constants/app.colors';

function Loader({ isLoading }: { isLoading: boolean }): JSX.Element {

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                animationType="fade"
                visible={isLoading}>
                <View style={styles.modalBackground}>
                    <ActivityIndicator size="large" color={AppColors.blue} />
                </View>
            </Modal>
        </View>
    );
}

export default Loader;

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
    }
});
