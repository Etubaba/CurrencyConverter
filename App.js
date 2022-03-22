


import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Alert } from 'react-native';
import { NativeBaseProvider, FormControl, Stack, CheckIcon, Select } from "native-base";
import { Center, Box } from "native-base";
import axios from 'axios'

const App = () => {
  const [money, setMoney] = useState(null)
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [rates, setRates] = useState([])
  const [calc, setCalc] = useState(undefined)
  const [label, setLabel] = useState(null)
  const [label2, setLabel2] = useState(false)


  const url = 'https://v6.exchangerate-api.com/v6/950c81e733d1e121c584b0e3/latest/USD'


  const num1 = Number(money)

  useEffect(() => {
    const fetchRates = async () => {
      await axios.get(url)
        .then(res => setRates(res.data.conversion_rates))
    }

    fetchRates()
  }, [])

  console.log(label)



  const main = Object.entries(rates)


  const rate = main.map(function (row) {
    return {
      cur: row[0],
      pri: row[1]
    };
  });


  const convert = () => {
    if (money === null || from === null) {
      Alert.alert('Oops!!', 'All fields are required', [
        { text: 'Ok', onPress: () => console.log('OK') }
      ])
    } else {

      // const ans = Math.round(num1 * to / from)
      const ans = num1 * to / from
      setCalc(ans)
    }


  }

  const reload = () => {
    setCalc(undefined)
    setMoney('')
    setFrom('')
    setTo('')

  }



  return (
    < NativeBaseProvider>
      <View style={styles.con}>
        <Text style={styles.logo} >EtuX</Text>
        <View style={{ width: 62, position: 'absolute', left: '85%', top: '10%' }}>
          <Button title='Reload' onPress={reload} />
        </View>
      </View>

      {/* <Button style={styles.btn} title='Country Codes' /> */}
      <Center>
        <Box bg="#ffff"
          top={-70}
          p={5}
          alignItems="center"
          position='absolute'
          zIndex={5}
          shadow='5'
          borderRadius="20"
          height={550}
          width='90%'
        >
          <FormControl>
            <Stack space={5} >
              <FormControl.Label>Amount</FormControl.Label>

              <TextInput placeholder="Amount" style={styles.input} value={money} onChangeText={(itemValue) => setMoney(itemValue)} />


              <FormControl.Label>From</FormControl.Label>

              <Select selectedValue={from} minWidth="200" accessibilityLabel="From" placeholder="Enter from" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setFrom(itemValue)}>
                {rate.map((rate, index) => <Select.Item key={index} label={rate.cur} value={rate.pri}
                // onPress={() => setLabel(rate.cur)}
                />)}

              </Select>
              <FormControl.Label>To</FormControl.Label>


              <Select selectedValue={to} minWidth="200" accessibilityLabel="From" placeholder="Enter To" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={(itemValue) =>
                setTo(itemValue)}>
                {rate.map((rate, index) => <Select.Item
                  // onSe={() => setLabel2(rate.cur)}
                  key={index} label={rate.cur} value={rate.pri} />)}
              </Select>
              <View style={{ marginBottom: 20 }}></View>

              {calc === undefined ? < Button title='Convert' onPress={convert} /> : (
                <View>
                  <Text>{label} {money} <Text style={styles.ans}
                  >  = {calc}   </Text> </Text>
                  <Button title='Convert' onPress={convert} />
                </View>)}
            </Stack>






          </FormControl>


        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  con: {
    width: "100%",
    padding: 10,
    display: 'flex',
    backgroundColor: '#29304A',
    height: '30%',
    justifyContent: 'center',
    textAlign: 'center'
  },
  logo: {
    position: 'relative',
    color: '#ffff',
    top: -70,
    fontSize: 40



  },

  input: {
    height: 40,
    margin: 12,
    width: 270,
    borderWidth: 1,
    padding: 10,
  },

  ans: {
    fontSize: 30,
    alignItems: 'center'


  },
  btn: {
    width: 20,
    position: 'absolute',
    top: -100
  }

})





export default App;

