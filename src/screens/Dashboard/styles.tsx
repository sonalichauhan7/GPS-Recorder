import { StyleSheet } from 'react-native';
import { AppColors } from '../../constants/app.colors';
import { AppSizes } from '../../utils/sizes';
import { AppFonts } from '../../constants/app.fonts';

const styles = StyleSheet.create({
    saContainer: {
        flex: 1,
        backgroundColor: AppColors.white
    },
    mainContainer: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    coHeader: {
        color: AppColors.grey,
        backgroundColor: AppColors.greyBg,
        width: "100%",
        paddingVertical: AppSizes.smartScale(9),
        paddingLeft: AppSizes.smartWidthScale(15),
        fontFamily: AppFonts.REGULAR,
        fontSize: AppSizes.countPixelRatio(12),
        lineHeight: AppSizes.countPixelRatio(18),
        fontWeight: "400",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: AppSizes.smartScale(100),
    },
    emptyImg: {
        height: AppSizes.smartScale(150),
        width: AppSizes.smartWidthScale(150)
    },
    welcomeTxt: {
        color: AppColors.black,
        fontFamily: AppFonts.MEDIUM,
        fontSize: AppSizes.countPixelRatio(20),
        lineHeight: AppSizes.countPixelRatio(30),
        fontWeight: "500"
    },
    gpsEmptyTxt: {
        color: AppColors.grey,
        fontFamily: AppFonts.REGULAR,
        fontSize: AppSizes.countPixelRatio(13),
        lineHeight: AppSizes.countPixelRatio(19.5),
        fontWeight: "400"
    },
    addContainer: {
        height: AppSizes.smartWidthScale(70),
        width: AppSizes.smartWidthScale(70),
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 999,
        marginBottom: AppSizes.smartScale(60),
        marginRight: AppSizes.smartScale(20),
    },
    addImg: {
        height: AppSizes.smartScale(80),
        width: AppSizes.smartWidthScale(80)
    },
    separator: {
        height: AppSizes.smartScale(1),
        width: "100%",
        backgroundColor: AppColors.greyOne
    }
})

export default styles;