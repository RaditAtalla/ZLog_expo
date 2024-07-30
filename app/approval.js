import React from 'react';
import Layout from '@components/Layout';
import { View } from 'react-native';
import Button from '@components/Button';
import colors from '@constants/colors';

const Approval = () => {
  return (
    <Layout
      hasBackButton
      style={{justifyContent: 'space-between'}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          height: 300,
          width: '100%',
        }}
      />
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <Button color={colors.warning} label={'Not Approve'} style={{ flex: 1 }} />
        <Button color={colors.success} label={'Approve'} style={{ flex: 1 }} />
      </View>
    </Layout>
  );
};

export default Approval;
