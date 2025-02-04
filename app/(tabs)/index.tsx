import { View, Text, StyleSheet, Button, TextInput, Image } from 'react-native';
import AccountsList from '../../components/AccountList';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import database, { accountsCollection } from '../../db';
import { useState } from 'react';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [cap, setCap] = useState('');
  const [tap, setTap] = useState('');

  const createAccount = async () => {
    console.log("Create account");

    await database.write(async () => {
      await accountsCollection.create((account) => {
        account.name = name;
        account.cap = Number.parseFloat(cap);
        account.tap = Number.parseFloat(tap);
      });
    });

    setName('');
    setCap('');
    setTap('');
  };

  const onRead = async () => {
    const accounts = await accountsCollection.query().fetch();
    console.log("onRead");
  }

  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Link href="/accounts">account</Link>
      <AccountsList />

      <View>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <TextInput
          value={cap}
          onChangeText={setCap}
          placeholder="CAP %"
        />
        <TextInput
          value={tap}
          onChangeText={setTap}
          placeholder="TAP %"
        />
      </View>
      <Button title="Add account" onPress={createAccount}/>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
