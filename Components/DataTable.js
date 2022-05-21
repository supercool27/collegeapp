import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
const TableExample = (props) => {
const { user } = props;
console.log(user);
return (
	<DataTable style={styles.container}>
	<DataTable.Header style={styles.tableHeader}>
		<DataTable.Title>
		Student Name: </DataTable.Title>
		<DataTable.Title>
		{
			user.map((data,index) =>
			{ data.sch_due_date; })
		}  </DataTable.Title>
		<DataTable.Title>                </DataTable.Title>
	</DataTable.Header>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Student Roll:     </DataTable.Cell>
		<DataTable.Cell>   302902219312      </DataTable.Cell>
		<DataTable.Cell>   </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Caution Money:</DataTable.Cell>
		<DataTable.Cell>   0</DataTable.Cell>
		<DataTable.Cell>    </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Kit Fees:</DataTable.Cell>
		<DataTable.Cell>   0  </DataTable.Cell>
		<DataTable.Cell>   20</DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Apron Fees:</DataTable.Cell>
		<DataTable.Cell>   0</DataTable.Cell>
		<DataTable.Cell>   </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Other Fees:	</DataTable.Cell>
		<DataTable.Cell>   0</DataTable.Cell>
		<DataTable.Cell>   </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Sport Fees:</DataTable.Cell>
		<DataTable.Cell>   150</DataTable.Cell>
		<DataTable.Cell>    </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Book Bank Fees:</DataTable.Cell>
		<DataTable.Cell>   1000</DataTable.Cell>
		<DataTable.Cell>    </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Scholarship:</DataTable.Cell>
		<DataTable.Cell>   0</DataTable.Cell>
		<DataTable.Cell></DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Tution Fees:</DataTable.Cell>
		<DataTable.Cell>   12500</DataTable.Cell>
		<DataTable.Cell></DataTable.Cell>
	</DataTable.Row>
	</DataTable>
);
};

export default TableExample;
const styles = StyleSheet.create({
container: {
	padding: 15,
	justifyContent: 'center'
},
tableHeader: {
	backgroundColor: '#DCDCDC',
},
paddingforleft:{
 width:400,
 padding:5
}
});
