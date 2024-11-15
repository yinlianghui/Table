import logo from './logo.svg';
import './App.css';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash'

function App() {
  let [trCount, setTRCount] = useState(0);
  let [tdCount, setTDCount] = useState(0);
  console.log("==render===", trCount, tdCount);

  let generateTableData = (rows,columns) => {
    console.log("==generateTableData===", rows,columns);
    let trs = [];
    let tds = [];
    if(rows > 0 && columns > 0){
      for(var i=0;i < rows;i++){
        tds = [];
        for(var j=0;j < columns;j++){
          tds.push([i,j]);
        }
        trs.push(tds);
      }
    }
    return trs;
  }

  let data = useMemo(()=>{
    return generateTableData(trCount, tdCount);
  }, [trCount, tdCount]);

  // 创建防抖处理函数
  const debouncedSetTRCount = useCallback(debounce((value) => {
    setTRCount(value);
  }, 300), []);

  const debouncedSetTDCount = useCallback(debounce((value) => {
    setTDCount(value);
  }, 300), []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <input
            type="text"
            onChange={(e) => {
              let v = parseInt(e.currentTarget.value);
              if (!isNaN(v)) {
                debouncedSetTRCount(v);
              }
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              let v = parseInt(e.currentTarget.value);
              if (!isNaN(v)) {
                debouncedSetTDCount(v);
              }
            }}
          />
        </p>
        <table>
          <tbody>
            {data.length ? (
              data.map((row, i)=>{
                return <tr key={i}>
                  {row.map((column, j)=>{
                    return <td key={`${i}-${j}`}>r{column[0]}, c{column[1]}</td>
                  })}
                </tr>
              })
            ) : <tr><td>请输入行数和列数</td></tr>
            }
          </tbody>
        </table>
        
      </header>
    </div>
  );
}

export default App;
