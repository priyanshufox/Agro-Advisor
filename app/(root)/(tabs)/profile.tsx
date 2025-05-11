import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'

const Profile = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme()

  const menuItems = [
    { icon: 'person-outline' as const, title: 'Personal Information', subtitle: 'Update your personal details' },
    { icon: 'notifications-outline' as const, title: 'Notifications', subtitle: 'Manage your notifications' },
    { icon: 'shield-checkmark-outline' as const, title: 'Privacy', subtitle: 'Control your privacy settings' },
    { icon: 'help-circle-outline' as const, title: 'Help & Support', subtitle: 'Get help and contact support' },
    { icon: 'information-circle-outline' as const, title: 'About', subtitle: 'Learn more about AgroAdvisor' },
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        {/* Profile Header */}
        <View style={{ padding: 24, backgroundColor: colors.card, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 }}>
          <View className="flex-row justify-between items-center mb-6">
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>Profile</Text>
            <TouchableOpacity
              className="flex-row items-center space-x-2"
              onPress={toggleTheme}
            >
              <Ionicons name={isDarkMode ? 'moon' : 'sunny'} size={24} color={colors.text} />
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
              />
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <View className="relative">
              <Image
                source={require('../../../assets/images/logo.png')}
                className="w-24 h-24 rounded-full"
              />
              <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.primary, padding: 8, borderRadius: 9999 }}>
                <Ionicons name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16, color: colors.text }}>John Doe</Text>
            <Text style={{ color: colors.secondary }}>john.doe@example.com</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ padding: 24 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                marginBottom: 16,
                borderRadius: 12,
                backgroundColor: colors.card,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
              }}>
                <Ionicons name={item.icon} size={24} color={colors.text} />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>
                  {item.title}
                </Text>
                <Text style={{ color: colors.secondary }}>
                  {item.subtitle}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            marginHorizontal: 24,
            marginBottom: 32,
            padding: 16,
            borderRadius: 12,
            backgroundColor: isDarkMode ? '#991B1B' : '#EF4444',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile