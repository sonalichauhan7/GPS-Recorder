import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppSizes } from '../utils/sizes';
import { AppColors } from '../constants/app.colors';

interface IHeaderProps {

}

function Header({ }: IHeaderProps): JSX.Element {

    return (
        <View style={styles.container} />
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.blue,
        height: AppSizes.smartScale(55),
        width: "100%",
    }
})