import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { Grid, Box, Typography, Card, CardContent } from '@material-ui/core';

const EvolutionPrix = () => {
    
  const [dataGoogle, setDataGoogle] = useState([]);
  const [dataAmazon, setDataAmazon] = useState([]);
  const [dataAmazonMin, setDataAmazonMin] = useState("");
  const [dataAmazonMinDate, setDataAmazonMinDate] = useState("");
  const [dataAmazonMax, setDataAmazonMax] = useState("");
  const [dataAmazonMaxDate, setDataAmazonMaxDate] = useState("");
  const [dataGoogleMin, setDataGoogleMin] = useState("");
  const [dataGoogleMinDate, setDataGoogleMinDate] = useState("");
  const [dataGoogleMax, setDataGoogleMax] = useState("");
  const [dataGoogleMaxDate, setDataGoogleMaxDate] = useState("");

  
  
  const retrieveDetails = () => {
    
        axios.get(`http://localhost:5000/DataGraph/FindAllAV`)
          .then(response => {
            setDataAmazonMin(response.data.minPriceAmazon.lowestPriceOfTheDay);
            setDataAmazonMinDate(response.data.minPriceAmazon.timestamp);
            setDataAmazonMax(response.data.maxPriceAmazon.highestPriceOfTheDay);
            setDataAmazonMaxDate(response.data.maxPriceAmazon.timestamp);
            setDataGoogleMin(response.data.minPriceGoogle.lowestPriceOfTheDay);
            setDataGoogleMinDate(response.data.minPriceGoogle.timestamp);
            setDataGoogleMax(response.data.maxPriceGoogle.highestPriceOfTheDay);
            setDataGoogleMaxDate(response.data.maxPriceGoogle.timestamp);
            
          })
          .catch(e => {
            console.log(e);
          });
  };

  useEffect(() => {
    retrieveDetails();
  }, []);
  
  const retrieveData = () => {
    
        axios.get(`http://localhost:5000/DataGraph/FindAll`)
          .then(response => {
            setDataGoogle(response.data.evolution.googleAveragePrices);
            setDataAmazon(response.data.evolution.amazonAveragePrices);
          })
          .catch(e => {
            console.log(e);
          });
  };

  useEffect(() => {
    retrieveData();
  }, []);
  
    const optionslinechart = {
      chart: {
        height: 350,
        type: 'line',
        fontFamily: "'DM Sans', sans-serif",
        foreColor: '#adb0bb',
        zoom: {
          type: 'x',
          enabled: true,
        },
        toolbar: {
          show: false,
        },
        shadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 1,
        },
      },
      xaxis: {
        categories: ['Jan.', 'Fèv.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Aout', 'Sep.', 'Oct.', 'Nov.', 'Déc.'],
        // title: {
        //   text: 'Month',
        // },
      },
      grid: {
        show: false,
      },
      colors: ['#0b70fb', '#6ac3fd'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight',
        width: '2',
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        floating: true,
        offsetY: 35,
        offsetX: -5,
      },
      tooltip: {
        theme: 'dark',
      },
    };
    const serieslinechart = [
      {
        name: 'Google',
        data: dataGoogle,
        // data: [10, 29, 33, 36, 32, 32, 3, 33, 3, 33, 33],
      },
      {
        name: 'Amazaone',
        data: dataAmazon,
        // data: [12, 11, 12, 43, 17, 13, 13, 14, 15, 16, 17],
      },
    ];

    return  (
    <div>
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={8} style={{paddingTop: "50px"}}>
            <Card variant="outlined">
                <Box p={2} display="flex" alignItems="center">
                <Box flexGrow={1}>
                    <Typography variant="h6" align="center">Evolution du prix des actions Amazone et Google sur 2023</Typography>
                </Box>
                </Box>
                <CardContent>
                <Chart options={optionslinechart} series={serieslinechart} type="line" height="308px" />
                </CardContent>
            </Card>
            </Grid>
            
            <Grid item xs={8} style={{paddingTop: "50px"}}>
              
                <Box p={2} display="flex" alignItems="center">
                  <Box flexGrow={1}>
                      <Typography variant="h7" align="center">Aymen devrait acheter 100.000 € d'action Amazon le {dataAmazonMinDate} au prix de {dataAmazonMin} € </Typography>
                  </Box>
                  <Box flexGrow={1}>
                      <Typography variant="h7" align="center">Il devrait ensuite vendre ces actions le {dataAmazonMaxDate} au prix {dataAmazonMax} € pour faire un gain de xx,xx € </Typography>
                  </Box>
                  <Box flexGrow={1}>
                      <Typography variant="h7" align="center">Anouar devrait acheter 100.000 € d'action Google le {dataGoogleMinDate} au prix de {dataGoogleMin} € </Typography>
                  </Box>
                  <Box flexGrow={1}>
                      <Typography variant="h7" align="center">Il devrait ensuite vendre ces actions le {dataGoogleMaxDate} au prix {dataGoogleMax} € pour faire un gain de xx,xx € </Typography>
                  </Box>
                </Box>
            </Grid>
        </Grid>
    </div>
    );
};

export default EvolutionPrix;