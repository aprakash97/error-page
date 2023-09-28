import React, { useState, useEffect } from "react";

function DynamicColumnComponent() {
  const [noTripValue, setNoTripValue] = useState(0);
  const [columns, setColumns] = useState([{ id: "serialNo", name: "User" }]);
  const [rows, setRows] = useState([]);

  const [data, setData] = useState([
    {
      id: 89,
      serialNumber: "2525",
    },
    {
      id: 90,
      serialNumber: "3525",
    },
  ]);

  const handleDropdownChange = (event) => {
    const value = parseInt(event.target.value);
    setNoTripValue(value);
  };

  const handleButtonClick = () => {
    const newColumns = [{ id: "serialNo", name: "User" }]; // Initial User column
    for (let i = 1; i <= noTripValue; i++) {
      const newColumn = {
        id: `column-${i}`,
        name: `Trip MAS010-${i}`,
        tickedUserIds: [],
        tickedPackageIds: [],
        columnId: i,
      };
      newColumns.push(newColumn);
    }
    setColumns(newColumns);

    const newRows = [];
    for (let i = 1; i <= noTripValue; i++) {
      const newRow = { id: i, name: `Passenger ${i}` };
      newRows.push(newRow);
    }
    setRows(newRows);
  };

  // const handleCheckBoxChange = (event, columnIndex, rowId) => {
  //   // const updatedColumns = [...columns];
  //   // const column = updatedColumns[columnIndex];
  //   // if (event.target.checked) {
  //   //   column.tickedUserIds.push(rowId);
  //   // } else {
  //   //   const index = column.tickedUserIds.indexOf(rowId);
  //   //   if (index !== -1) {
  //   //     column.tickedUserIds.splice(index, 1);
  //   //   }
  //   // }
  //   // setColumns(updatedColumns);
  //   const updatedColumns = [...columns];
  //   const column = updatedColumns[columnIndex];
  //   if (event.target.checked) {
  //     column.tickedUserIds.push(rowId);
  //   } else {
  //     const index = column.tickedUserIds.indexOf(rowId);
  //     if (index !== -1) {
  //       column.tickedUserIds.splice(index, 1);
  //     }
  //   }
  //   setColumns(updatedColumns);
  // };

  // const handleSubmit = () => {
  //   // Perform submit action with the data (columns and rows) as needed
  //   // const x = columns.slice(1);
  //   // const y = x.map(obj => obj.tickedUserIds);
  //   // console.log(x);
  //   // const tickedUserIdsArray = columns
  //   //   .filter(
  //   //     (column) => column.tickedUserIds && column.tickedUserIds.length > 0
  //   //   )
  //   //   .map((column) => ({ tickedUserIds: column.tickedUserIds }));
  //   // console.log(tickedUserIdsArray);
  //   const tickedUserIdsArray = columns
  //     .filter(
  //       (column) => column.tickedUserIds && column.tickedUserIds.length > 0
  //     )
  //     .map((column) => ({ tickedUserIds: column.tickedUserIds }));
  //   console.log(tickedUserIdsArray);
  // };

  // const handleCheckBoxChange = (event, columnIndex, rowId, tableId) => {
  //   const updatedColumns = [...columns];
  //   const column = updatedColumns[columnIndex];
  //   if (event.target.checked) {
  //     if (tableId === 0) {
  //       column.tickedUserIds.push(rowId);
  //     } else if (tableId === 1) {
  //       column.tickedPackageIds.push(rowId);
  //     }
  //   } else {
  //     let index;
  //     if (tableId === 0) {
  //       index = column.tickedUserIds.indexOf(rowId);
  //       if (index !== -1) {
  //         column.tickedUserIds.splice(index, 1);
  //       }
  //     } else if (tableId === 1) {
  //       index = column.tickedPackageIds.indexOf(rowId);
  //       if (index !== -1) {
  //         column.tickedPackageIds.splice(index, 1);
  //       }
  //     }
  //   }
  //   setColumns(updatedColumns);
  // };

  const handleCheckBoxChange = (event, columnIndex, rowId, tableId) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      const column = updatedColumns[columnIndex];
      if (event.target.checked) {
        if (tableId === 0) {
          column.tickedUserIds = [...column.tickedUserIds, rowId];
        } else if (tableId === 1) {
          column.tickedPackageIds = [...column.tickedPackageIds, rowId];
        }
      } else {
        if (tableId === 0) {
          column.tickedUserIds = column.tickedUserIds.filter(
            (id) => id !== rowId
          );
        } else if (tableId === 1) {
          column.tickedPackageIds = column.tickedPackageIds.filter(
            (id) => id !== rowId
          );
        }
      }
      return updatedColumns;
    });
  };

  const handleSubmit = () => {
    const combinedArray = columns
      .map((column) => ({
        tickedUserIds: column.tickedUserIds || [],
        tickedPackageIds: column.tickedPackageIds || [],
      }))
      .filter(
        (column) =>
          (column.tickedUserIds && column.tickedUserIds.length > 0) ||
          (column.tickedPackageIds && column.tickedPackageIds.length > 0)
      );

    console.log(combinedArray);
  };

  // const handleSubmit = () => {
  //   const tickedUserIdsArray = columns
  //     .filter(
  //       (column) => column.tickedUserIds && column.tickedUserIds.length > 0
  //     )
  //     .map((column) => ({
  //       tickedUserIds: column.tickedUserIds,
  //       tickedPackageIds: [],
  //     }));

  //   const tickedPackageIdsArray = columns
  //     .filter(
  //       (column) =>
  //         column.tickedPackageIds && column.tickedPackageIds.length > 0
  //     )
  //     .map((column) => ({
  //       tickedUserIds: [],
  //       tickedPackageIds: column.tickedPackageIds,
  //     }));

  //   const combinedArray = tickedUserIdsArray.concat(tickedPackageIdsArray);
  //   console.log(combinedArray);
  // };
  console.log(noTripValue);
  return (
    <div>
      <select value={noTripValue} onChange={handleDropdownChange}>
        <option value={0}>Select</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>

      <button onClick={handleButtonClick} disabled={noTripValue === 0}>
        Set Columns
      </button>

      <section>
        <table>
          <thead>
            <tr>
              {columns.map((column, columnIndex) => (
                <th key={column.id}>{column.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column, columnIndex) => (
                  <td key={column.id}>
                    {columnIndex === 0 ? (
                      row.name
                    ) : (
                      <input
                        type="checkbox"
                        checked={column.tickedUserIds.includes(row.id)}
                        onChange={(event) =>
                          handleCheckBoxChange(event, columnIndex, row.id, 0)
                        }
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <table>
          <thead>
            <tr>
              {columns.map((column, columnIndex) => (
                <th key={column.id}>{column.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((column, columnIndex) => (
                  <td key={column.id}>
                    {columnIndex === 0 ? (
                      row.serialNumber
                    ) : (
                      <input
                        type="checkbox"
                        checked={column.tickedPackageIds.includes(row.id)}
                        onChange={(event) =>
                          handleCheckBoxChange(event, columnIndex, row.id, 1)
                        }
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <button onClick={handleSubmit} disabled={rows.length === 0}>
        Submit
      </button>
    </div>
  );
}

export default DynamicColumnComponent;
