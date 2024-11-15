import React, { useMemo, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import './App.css';

function App() {
  const [trCount, setTRCount] = useState(0);
  const [tdCount, setTDCount] = useState(0);

  console.log("==render===", trCount, tdCount);

  const generateTableData = (rows, columns) => {
    console.log("==generateTableData===", rows, columns);
    const trs = [];
    if (rows > 0 && columns > 0) {
      for (let i = 0; i < rows; i++) {
        const tds = [];
        for (let j = 0; j < columns; j++) {
          tds.push([i, j]);
        }
        trs.push(tds);
      }
    }
    return trs;
  };

  const data = useMemo(() => generateTableData(trCount, tdCount), [trCount, tdCount]);

  // 防抖函数，确保在组件生命周期中保持不变
  const debouncedSetTRCount = useCallback(debounce((value) => {
    setTRCount(value);
  }, 300), []);

  const debouncedSetTDCount = useCallback(debounce((value) => {
    setTDCount(value);
  }, 300), []);

  // 输入处理逻辑
  const handleTRChange = (e) => {
    const value = parseInt(e.currentTarget.value, 10);
    if (!isNaN(value)) {
      debouncedSetTRCount(value);
    }
  };

  const handleTDChange = (e) => {
    const value = parseInt(e.currentTarget.value, 10);
    if (!isNaN(value)) {
      debouncedSetTDCount(value);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <input
            type="number"
            onChange={handleTRChange}
          />
          <input
            type="number"
            onChange={handleTDChange}
          />
        </p>
        <table>
          <tbody>
            {data.length ? (
              data.map((row, i) => (
                <tr key={i}>
                  {row.map((column, j) => (
                    <td key={`${i}-${j}`}>r{column[0]}, c{column[1]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr><td>请输入行数和列数</td></tr>
            )}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
