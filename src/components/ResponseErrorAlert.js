import {Image, View, Text, Modal, StyleSheet,TouchableOpacity} from 'react-native';
import React from 'react';

const ResponseErrorAlert = ({onClose, message, title}) => {
  return (
    <Modal
      transparent
      animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* pop up Heading start*/}
          <View style = {styles.titleContainer}>
            <Image
              source={require('../assets/error.png')}
              style={{width: 30, height: 30}}
            />
            <Text style={styles.title}>{title}</Text>
          </View>
          {/* Pop up Heading ends here */}
          <Text style = {styles.message}>{message}</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={onClose}>
              <Text style={styles.primaryButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
        
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  container: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 10,
  },
  titleContainer: {flexDirection: 'row'},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 10,
    color: '#333',
  },
  message: {
    fontSize: 18,
    marginVertical:10,
    color:'#666',
    textAlign:'justify'
  },
  primaryButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical:10
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ResponseErrorAlert;
