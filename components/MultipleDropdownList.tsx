import { darkTheme, lightTheme } from '@/constants/darkmode';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo, useEffect, useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

interface MultipleDropdownListProps {
    data: { key: string; value: string }[];
    selectedItems: string[];
    onSelectionChange: (selected: string[]) => void;
    defaultSelected?: string[];
    placeholder?: string;
}

const MultipleDropdownList: React.FC<MultipleDropdownListProps> = ({
    data,
    selectedItems,
    onSelectionChange,
    defaultSelected = [],
    placeholder = 'Select Items',
}) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);

    // Handle Initial State
    useEffect(() => {
        if (!hasInitialized && defaultSelected.length > 0) {
            onSelectionChange(defaultSelected);
            setHasInitialized(true);
        }
    }, [defaultSelected, hasInitialized, onSelectionChange]);

    // Toggle selection logic
    const toggleSelect = (key: string) => {
        const current = selectedItems ?? [];
        const isSelected = current.includes(key);
        const updatedSelection = isSelected
            ? current.filter((selected) => selected !== key)
            : [...current, key];

        onSelectionChange(updatedSelection);
    };



    return (
        <View>
            {/* Dropdown Box */}
            <Pressable style={[styles.boxStyles]} onPress={() => setIsDropdownOpen(true)}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', }}>
                    {selectedItems?.length > 0 ? (
                        selectedItems.map((key, index) => (
                            <View
                                key={index}
                                style={{
                                    backgroundColor: '#4caf4f',
                                    paddingVertical: widthPercentageToDP(0.8),
                                    paddingHorizontal: widthPercentageToDP(2),
                                    borderRadius: widthPercentageToDP(1),
                                    marginRight: 5,
                                    marginBottom: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'poppinsMedium',
                                        fontSize: heightPercentageToDP(1.3),
                                        color: '#fff',
                                    }}
                                >
                                    {data.find((item) => item.key === key)?.value ?? key}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={{
                            fontFamily: "poppinsRegular",
                            fontSize: heightPercentageToDP(1.5),
                            color: "#9E9E9E"
                        }}>
                            {placeholder}
                        </Text>
                    )}
                </View>
                <View>
                    <MaterialCommunityIcons name="chevron-down" size={heightPercentageToDP(2.2)} color={theme.sub} />
                </View>
            </Pressable>

            {/* Modal for dropdown list */}
            <Modal
                visible={isDropdownOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsDropdownOpen(false)}
            >
                <Pressable style={styles.modalOverlay}
                    onPress={() => setIsDropdownOpen(false)}
                >
                    <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
                        <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: widthPercentageToDP(6),
                            paddingVertical: heightPercentageToDP(1),
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingBottom: heightPercentageToDP(2)
                        }}>
                            <Text
                                style={{
                                    fontFamily: 'poppinsSemiBold',
                                    fontSize: heightPercentageToDP(1.5),
                                    color: theme.textColor
                                }}
                            >
                                Tap to select
                            </Text>
                            <Pressable
                                onPress={() => setIsDropdownOpen(false)}
                            >
                                <Ionicons name='close-outline' size={heightPercentageToDP(2.5)} color={theme.sub} />
                            </Pressable>
                        </View>
                        <ScrollView>

                            {
                                !data || data?.length === 0 ? <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingVertical: heightPercentageToDP(2)
                                }}>
                                    <MaterialCommunityIcons name='flask-empty-remove-outline' size={heightPercentageToDP(2)} />
                                    <Text
                                        style={{
                                            fontFamily: "poppinsRegular",
                                            fontSize: heightPercentageToDP(1.5),
                                            color: theme.textColor,
                                            marginTop: heightPercentageToDP(1)
                                        }}
                                    >The list is empty</Text>
                                </View>
                                    :
                                    data.map((item) => (
                                        <View key={item.key} style={{ paddingHorizontal: widthPercentageToDP(4) }}>
                                            <TouchableOpacity
                                                style={[
                                                    styles.item,
                                                    selectedItems?.includes(item.key) && styles.selectedItem,
                                                ]}
                                                onPress={() => toggleSelect(item.key)}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Text
                                                        style={[
                                                            [styles.itemText, { color: theme.textColor }],
                                                            selectedItems?.includes(item.key) && styles.selectedItemText,
                                                        ]}
                                                    >
                                                        {item.key}
                                                    </Text>
                                                    {selectedItems?.includes(item.key) ? <Ionicons name='checkbox' size={heightPercentageToDP(2)} color={"#4caf4f"} /> : <Ionicons name='square-outline' size={heightPercentageToDP(2)} color={"gray"} />}
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                        </ScrollView>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    boxStyles: {
        minHeight: heightPercentageToDP(6.5),
        maxHeight: heightPercentageToDP(50),
        alignItems: 'center',
        borderColor: '#205E77',
        marginTop: heightPercentageToDP(1.2),
        borderWidth: 0.5,
        borderRadius: widthPercentageToDP(2),
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: widthPercentageToDP(5),
        paddingVertical: heightPercentageToDP(1),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '90%',
        maxHeight: '70%',
        paddingVertical: heightPercentageToDP(2),
    },
    item: {
        padding: heightPercentageToDP(2),
        borderColor: '#DADADA',
    },
    selectedItem: {
        backgroundColor: '#e0f7fa',
    },
    itemText: {
        fontFamily: 'poppinsRegular',
        fontSize: heightPercentageToDP(1.5),
        color: '#333',
    },
    selectedItemText: {
        color: '#00796b',
        fontFamily: 'poppinsRegular',
        fontSize: heightPercentageToDP(1.5),
    },
    closeButton: {
        marginTop: heightPercentageToDP(2),
        backgroundColor: '#205E77',
        height: heightPercentageToDP(6),
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontFamily: 'poppinsSemiBold',
        fontSize: heightPercentageToDP(1.6),
    },
});

export default memo(MultipleDropdownList);