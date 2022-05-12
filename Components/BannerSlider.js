import React from 'react';
import {View, Image} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function BannerSlider({data}) {
  return (
  //   <Card>
  //   <Card.Title title="Card Title" subtitle="Card Subtitle" />
  //   <Card.Content>
  //     <Title>Card title</Title>
  //     <Paragraph>Card content</Paragraph>
  //   </Card.Content>
  //   <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
  //   <Card.Actions>
  //     <Button>Cancel</Button>
  //     <Button>Ok</Button>
  //   </Card.Actions>
  // </Card>,
    <Card>
      <View>
        <Image
          source={data.image}
          style={{ height: 150, width: 330, borderRadius: 10 }}
        />
      </View>
    </Card>
  );
}
