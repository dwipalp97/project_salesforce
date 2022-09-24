import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const BaseTextInput = (props) => {
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {

    }, [props.value])

    return (
        <View>
            <TextInput
                ref={props.ref}
                style={styles.txtinput}
                onChangeText={props.onChangeText}
                value={props.value}
                onSubmitEditing={props.nextRef && props.nextRef.current && props.nextRef.current.focus()}
                {...props}
                
            />
            {errorMsg.length > 0 &&
                <Text style={styles.errorTxt}>{errorMsg}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    txtinput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    errorTxt: {
        height: 40,
        marginTop: 5,
        color: "red",
        fontSize: 10
    },
});

export default BaseTextInput;