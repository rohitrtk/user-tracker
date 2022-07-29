import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  limit
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer
} from "@chakra-ui/react";

import { fs } from "../../firebase";

interface IEntryData {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

interface IEntry {
  id: string;
  data: IEntryData;
}

const Tracker = () => {

  const [value, loading, error] = useCollection(collection(fs, "entries"), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });

  const [entries, setEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    console.log(loading);
    if (!loading && value) {
      setEntries(value.docs.map((doc) => {
        return {
          data: doc.data(),
          id: doc.id
        } as IEntry;
      }));
    }
  }, [loading]);

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <TableHead columnNames={["First Name", "Last Name", "Email Address"]} />
          <Tbody>
            <>
              {entries.map(({ id, data }) => <TableBodyRow key={id} id={id} data={data} />)}
            </>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Tracker;

const TableHead = ({ columnNames }: { columnNames: string[] }) => {
  return (
    <Thead>
      <Tr>
        {columnNames.map((columnName) => <Th key={columnName}>{columnName}</Th>)}
      </Tr>
    </Thead>
  );
}

const TableBodyRow = ({ id, data }: IEntry) => {

  const { firstName, lastName, emailAddress } = data;

  return (
    <Tr onClick={() => {
      console.log(id);
    }}>
      <Td>{firstName}</Td>
      <Td>{lastName}</Td>
      <Td>{emailAddress}</Td>
    </Tr>
  );
}