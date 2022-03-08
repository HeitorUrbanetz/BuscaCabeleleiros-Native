import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';


import Api from '../../Api';

import * as Location from 'expo-location';

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,

  LoadingIcon,
  ListArea
} from "./styles";

import BarberItem from '../../components/BarberItem'

import SearchIcon from "../../assets/search.svg";
import MyLocationIcon from "../../assets/my_location.svg";

export default () => {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
 

  const handleLocationFinder = async () => {
    try {
      setCoords(null);
        
        let {result} = await Location.requestForegroundPermissionsAsync();
          if(result == 'granted') {
              setLoading(true);
              setLocationText('');
              setList([]);
    
              Location.getCurrentPositionAsync((info)=>{
                  setCoords(info.coords);
                  getBarbers();
              });
        }
      } catch (error) {
        alert(error)
      }
  }


  const getBarbers = async () => {
    setLoading(true);
    setList([]);

    let lat = null;
    let lng = null;
    if(coords){
      lat = coords.latitude;
      lng = coords.longitude;
    }

    let res = await Api.getBarbers(lat,lng, locationText);
    if(res.error == '') {
      if(res.loc){
        setLocationText(res.loc);
      }

      setList(res.data);

    } else {
      alert("Erro: "+res.error);
    }

    setLoading(false)
  }

  useEffect(()=> {
    getBarbers();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getBarbers();
  };

  const handleLocationSearch = () => {
    setCoords({});
    getBarbers();
  }

  return (

    <Container>
      <Scroller refresControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre o seu barbeiro favorito
          </HeaderTitle>
          <SearchButton onPress={() => navigation.navigate("Search")}>
            <SearchIcon width="26" height="26" fill="#FFFFFF" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#FFFFFF"
            value={locationText}
            onChangeText={t=>setLocationText}
            onEnditing={handleLocationSearch}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
          </LocationFinder>
        </LocationArea>

        { loading &&
        <LoadingIcon size='large' color='#FFFFFF'/>
        }

        <ListArea>
            {list.map((item, k) => (
              <BarberItem key={k} data={item}/>
            ))}
        </ListArea>
      

      </Scroller>
    </Container>
  );
};
