import React, {useState} from 'react';
import {AppRegistry, View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, Modal} from 'react-native';

const {width} = Dimensions.get('window');
const ITEM_SIZE = (width - 40) / 3;

const PhotoGalleryApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    {id: 1, color: '#FF6B9D', icon: '🌅', title: 'Sunset'},
    {id: 2, color: '#4FACFE', icon: '🏔️', title: 'Mountains'},
    {id: 3, color: '#43E97B', icon: '🌴', title: 'Beach'},
    {id: 4, color: '#FA709A', icon: '🌸', title: 'Flowers'},
    {id: 5, color: '#667eea', icon: '🌃', title: 'City'},
    {id: 6, color: '#fccb90', icon: '🍂', title: 'Autumn'},
    {id: 7, color: '#ee9ca7', icon: '🌺', title: 'Garden'},
    {id: 8, color: '#38f9d7', icon: '🌊', title: 'Ocean'},
    {id: 9, color: '#fc6076', icon: '🌄', title: 'Sunrise'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📸 Photo Gallery</Text>
        <Text style={styles.headerSubtitle}>Instagram-style Grid</Text>
      </View>

      <View style={styles.stats}>
        <StatItem icon="📷" value="127" label="Photos" />
        <StatItem icon="❤️" value="2.4K" label="Likes" />
        <StatItem icon="👥" value="456" label="Followers" />
      </View>

      <FlatList
        data={photos}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.grid}
        renderItem={({item}) => (
          <TouchableOpacity 
            style={[styles.photoCard, {backgroundColor: item.color}]}
            onPress={() => setSelectedImage(item)}
            activeOpacity={0.8}>
            <Text style={styles.photoIcon}>{item.icon}</Text>
            <View style={styles.photoOverlay}>
              <Text style={styles.photoTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal for full view */}
      <Modal
        visible={selectedImage !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}>
        <TouchableOpacity 
          style={styles.modal} 
          activeOpacity={1}
          onPress={() => setSelectedImage(null)}>
          {selectedImage && (
            <View style={[styles.modalCard, {backgroundColor: selectedImage.color}]}>
              <Text style={styles.modalIcon}>{selectedImage.icon}</Text>
              <Text style={styles.modalTitle}>{selectedImage.title}</Text>
              <View style={styles.modalActions}>
                <ActionButton icon="❤️" label="Like" />
                <ActionButton icon="💬" label="Comment" />
                <ActionButton icon="📤" label="Share" />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const StatItem = ({icon, value, label}) => (
  <View style={styles.statItem}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ActionButton = ({icon, label}) => (
  <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
    <Text style={styles.actionIcon}>{icon}</Text>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  header: {backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee'},
  headerTitle: {fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 5},
  headerSubtitle: {fontSize: 14, color: '#999'},
  stats: {flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 15, justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: '#eee'},
  statItem: {alignItems: 'center'},
  statIcon: {fontSize: 20, marginBottom: 5},
  statValue: {fontSize: 18, fontWeight: 'bold', color: '#333'},
  statLabel: {fontSize: 12, color: '#999'},
  grid: {padding: 5},
  photoCard: {width: ITEM_SIZE, height: ITEM_SIZE, margin: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3},
  photoIcon: {fontSize: 48, marginBottom: 10},
  photoOverlay: {position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderBottomLeftRadius: 10, borderBottomRightRadius: 10},
  photoTitle: {color: '#fff', fontSize: 12, fontWeight: '600', textAlign: 'center'},
  modal: {flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center'},
  modalCard: {width: width - 60, height: 400, borderRadius: 20, padding: 30, justifyContent: 'center', alignItems: 'center'},
  modalIcon: {fontSize: 120, marginBottom: 20},
  modalTitle: {fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 40},
  modalActions: {flexDirection: 'row', gap: 15},
  actionButton: {backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 20, alignItems: 'center', minWidth: 80},
  actionIcon: {fontSize: 24, marginBottom: 5},
  actionLabel: {color: '#fff', fontSize: 12, fontWeight: '600'},
});

AppRegistry.registerComponent('PhotoGalleryApp', () => PhotoGalleryApp);
export default PhotoGalleryApp;

