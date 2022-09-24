import * as React from 'react';
import { View, Image } from 'react-native';

const ImagePreview = (props) => {
    const { imageDetails } = props.route.params;
    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: imageDetails.assets[0].uri }} style={{ flex: 1 }} />
        </View>
    );
}

export default ImagePreview;