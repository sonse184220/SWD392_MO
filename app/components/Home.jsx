import React from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, Title, Paragraph, Chip, Badge, Divider } from 'react-native-paper';
import { Plane, Hotel, Utensils, Map, Search, Star } from 'lucide-react-native';

export default function Home() {
  const categories = [
    { name: "Flights", icon: (props) => <Plane {...props} /> },
    { name: "Hotels", icon: (props) => <Hotel {...props} /> },
    { name: "Food", icon: (props) => <Utensils {...props} /> },
    { name: "Tours", icon: (props) => <Map {...props} /> }
  ];

  const deals = [
    {
      id: 1,
      title: "Hanoi to Ho Chi Minh",
      type: "Flight",
      image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7905bd14-754a-4073-ae45-9574481b6ef9",
      originalPrice: "1,200,000₫",
      currentPrice: "950,000₫",
      rating: 4.5,
      discount: "-20%"
    },
    {
      id: 2,
      title: "Luxury Stay Da Nang",
      type: "Hotel",
      image: "https://source.unsplash.com/random/400x200/?hotel,vietnam",
      originalPrice: "2,500,000₫",
      currentPrice: "1,800,000₫",
      rating: 4.8,
      discount: "-28%"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section with Background */}
        <ImageBackground 
          source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c5917766-b5b4-4086-9c6c-1defdb813e01" }} 
          resizeMode="cover" 
          style={styles.heroSection}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroText}>Bạn muốn đi đâu vậy? Có CityScout lo!</Text>
            
            {/* Search Bar */}
            <TouchableOpacity style={styles.searchBar}>
              <Search size={20} color="#999" />
              <Text style={styles.searchText}>Search destinations, hotels...</Text>
            </TouchableOpacity>
            
            {/* Categories */}
            <View style={styles.categoriesRow}>
              {categories.map((category, index) => (
                <TouchableOpacity key={index} style={styles.categoryItem}>
                  <View style={styles.categoryIconContainer}>
                    {category.icon({ size: 24, color: "#FF475F" })}
                  </View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ImageBackground>

        {/* Hot Deals Section */}
        <Card style={styles.dealsSection}>
          <Card.Content>
            <Title style={styles.sectionTitle}>DEAL HOT HÔM NAY!</Title>
            
            <View style={styles.tabsContainer}>
              <Chip 
                selected={true} 
                selectedColor="#FF475F" 
                style={styles.activeTab}
                textStyle={styles.activeTabText}
              >
                All
              </Chip>
              
              <Chip 
                selected={false}
                style={styles.tab}
                textStyle={styles.tabText}
              >
                Flights
              </Chip>
              
              <Chip 
                selected={false}
                style={styles.tab}
                textStyle={styles.tabText}
              >
                Hotels
              </Chip>
              
              <Chip 
                selected={false}
                style={styles.tab}
                textStyle={styles.tabText}
              >
                Transportations
              </Chip>
            </View>
            
            <Divider style={styles.divider} />
            
            {/* Deal Cards */}
            {deals.map((deal) => (
              <Card key={deal.id} style={styles.dealCard}>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{deal.discount}</Text>
                </View>
                
                <Card.Cover source={{ uri: deal.image }} style={styles.dealImage} />
                
                <Card.Content style={styles.dealContent}>
                  <View style={styles.dealHeader}>
                    <Title style={styles.dealTitle}>{deal.title}</Title>
                    <Chip style={styles.dealTypeChip}>{deal.type}</Chip>
                  </View>
                  
                  <View style={styles.dealDetails}>
                    <View style={styles.ratingContainer}>
                      <Star size={16} color="#FFD700" />
                      <Text style={styles.ratingText}>{deal.rating}</Text>
                    </View>
                    
                    <View style={styles.priceContainer}>
                      <Text style={styles.originalPrice}>{deal.originalPrice}</Text>
                      <Text style={styles.currentPrice}>{deal.currentPrice}</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: 330,
    width: "100%",
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heroText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "90%",
    marginBottom: 20,
  },
  searchText: {
    marginLeft: 10,
    color: "#999",
    fontSize: 14,
  },
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  dealsSection: {
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 15,
    elevation: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#181A24",
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  tab: {
    marginRight: 10,
    backgroundColor: "#F0F0F0",
  },
  tabText: {
    color: "#888",
  },
  activeTab: {
    marginRight: 10,
    backgroundColor: "#FFE8EC",
  },
  activeTabText: {
    color: "#FF475F",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 10,
  },
  dealCard: {
    marginBottom: 16,
    elevation: 2,
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF475F",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  dealImage: {
    height: 160,
  },
  dealContent: {
    padding: 10,
  },
  dealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  dealTypeChip: {
    backgroundColor: "#E8F5E9",
    height: 26,
  },
  dealDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: "bold",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF475F",
  },
});