import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
} from 'react-native';
import {StyleSheet} from 'react-native';
import CalenderHeatMap from '../components/CalenderHeatMap';
import ResponseErrorAlert from '../components/ResponseErrorAlert';
import Toast from 'react-native-toast-message';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [totalSolved, setTotalSolved] = useState(0);
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);
  const [submissionCalender, setSubmissionCalender] = useState(null);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMsg] = useState('');

  const getData = async username => {
    const base_url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    console.log(base_url);
    setLoading(true);
    try {
      const response = await axios.get(base_url, {
        timeout: 5000,
      });
      console.log(response.data, 'response Error');

      if (response.data.status === 'error') {
        setError(true);
        setData(null);
        console.log(username, 'called from dashboard');

        if (username === '') {
          setErrorMsg(
            'We are Sorry ! Username can not be empty, Please Enter correct Username. ',
          );
        } else {
          setErrorMsg(
            response.data.message + '. Please enter the correct username !',
          );
        }
      } else {
        setData(response.data);
        setSubmissionCalender(response.data.submissionCalendar);
        setTotalSolved(response.data.totalSolved);
        setEasy(response.data.easySolved);
        setMedium(response.data.mediumSolved);
        setHard(response.data.hardSolved);
      }
    } catch (error) {
      console.log('Problem in fetcing data: ', error);
      setError(true);
      setData(error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setError(false);
    setData(null)
  };

  if (error) {
    if (data === null) {
      return (
        <ResponseErrorAlert
          title={'Invalid Input'}
          message={errorMessage}
          onClose={onClose}
        />
      );
    } else {
      return (
        <ResponseErrorAlert
          title={'Server Response Error'}
          message={"We are facing temporary issues while getting your data from our server,  Please try again later."}
          onClose={onClose}
        />
      );
    }
  }

  const clearInput = () => {
    setInputText('');
    setTotalSolved(0);
    setEasy(0);
    setMedium(0);
    setHard(0);
    setData(null);
    setSubmissionCalender(null);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
     <Toast/>
      <SafeAreaView>

        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter user-name here"
            value={inputText}
            onChangeText={text => setInputText(text)}></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={() => getData(inputText)}>
            <Text style={{margin: 2, color: '#ffffff'}}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clearInput}>
            <Text style={{margin: 2, color: '#ffffff'}}>Clear</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <Modal transparent={true} visible={loading}>
            <View style={styles.overlay}>
              <View style={styles.card}>
                <ActivityIndicator size="large" color="#8E44AD" />
                <Text style={styles.loadingText}>Loading data...</Text>
              </View>
            </View>
          </Modal>
        ) : (
          data && (
              <View style={styles.dataContainer}>
             {/* Submission Calender Starts */}
             <View>
               <CalenderHeatMap submissionCalender={submissionCalender} />
             </View>
             {/* Submission Calender End */}
           </View>
          )
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#AEC6CF',
    padding: 10,
    marginStart: 12,
  },
  button: {
    margin: 8,
    height: 35,
    padding: 4,
    backgroundColor: '#E91E63',
    borderRadius: 5,
  },
  dataContainer: {
    marginTop: 20,
    marginStart: 15,
    marginEnd:15,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    width: '50%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  loadingText: {
    marginTop: 5,
    alignContent: 'center',
    justifyContent: 'center',
    marginStart: 8,
    fontSize: 16,
    color: '#000',
  },
});

export default Dashboard;
