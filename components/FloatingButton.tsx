import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { FAB } from 'react-native-paper';
import { useRouter, useNavigation } from 'expo-router';

const FloatingButton = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const navigation = useNavigation(); // Pobieramy nawigację

  // Nasłuchiwanie zmiany ekranu i zamykanie przycisków
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => setOpen(false));
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      {/* Kliknięcie poza przyciskami zamyka je */}
      {open && (
        <Pressable style={styles.overlay} onPress={() => setOpen(false)} />
      )}

      {/* Kontener przycisków */}
      <View style={styles.fabContainer}>
        {open && (
          <View style={styles.actionsContainer}>
            <FAB
              style={styles.actionButton}
              icon="home"
              onPress={() => router.push('/home')}
            />
            <FAB
              style={styles.actionButton}
              icon="bookmark"
              onPress={() => router.push('/bill/create')}
            />
            <FAB
              style={styles.actionButton}
              icon="plus"
              onPress={() => router.push('/create')}
            />
          </View>
        )}

        {/* Główny przycisk */}
        <FAB
          style={styles.fab}
          icon={open ? 'close' : 'plus'}
          onPress={() => setOpen(!open)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 99,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 100,
  },
  fab: {
    backgroundColor: '#6200ee',
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 80,
    right: 0,
    alignItems: 'center',
  },
  actionButton: {
    marginBottom: 10,
  },
});

export default FloatingButton;
