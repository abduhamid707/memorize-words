import React, { useState, useEffect } from 'react';
import { 
    Button, TextField, Typography, Card, CardContent, Container, 
    List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, 
    Grid 
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { words } from '../db/data';

const App = () => {
    const [currentWord, setCurrentWord] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [savedWords, setSavedWords] = useState([]);
    const [autoPlay, setAutoPlay] = useState(false);
    const [intervalTime, setIntervalTime] = useState(4000);
    const [index, setIndex] = useState(0);
    const [randomMode, setRandomMode] = useState(false);
    const [openDictionary, setOpenDictionary] = useState(false);

    useEffect(() => {
        let timer;
        if (autoPlay) {
            timer = setInterval(() => {
                if (randomMode) {
                    getRandomWord(currentWord?.lang);
                } else {
                    getNextWord(currentWord?.lang);
                }
            }, intervalTime);
        }
        return () => clearInterval(timer);
    }, [autoPlay, intervalTime, randomMode, currentWord]);

    const getRandomWord = (lang) => {
        if (!words.length) return;
        const randomIndex = Math.floor(Math.random() * words.length);
        setCurrentWord({ ...words[randomIndex], lang });
        setUserInput('');
        setShowResult(false);
    };

    const getNextWord = (lang) => {
        if (!words.length) return;
        setIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % words.length;
            setCurrentWord({ ...words[nextIndex], lang });
            return nextIndex;
        });
        setUserInput('');
        setShowResult(false);
    };

    const checkAnswer = () => {
        setShowResult(true);
    };

    const saveWord = () => {
        if (currentWord && !savedWords.some((word) => word.en === currentWord.en)) {
            setSavedWords([...savedWords, currentWord]);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px', textAlign: 'center' }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>Training all words {words.length}</Typography>
                    {currentWord && (
                        <div>
                            <Typography variant="h6" gutterBottom>
                                {currentWord.lang === 'uz' ? currentWord.uz : currentWord.en}
                            </Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Javobingizni kiriting"
                                margin="normal"
                            />
                            {showResult && (
                                <Typography
                                    variant="body1"
                                    color={
                                        userInput.toLowerCase() === 
                                        (currentWord.lang === 'uz' ? currentWord.en.toLowerCase() : currentWord.uz.toLowerCase()) 
                                        ? 'success.main' 
                                        : 'error.main'
                                    }
                                >
                                    {userInput} ➝ {currentWord.lang === 'uz' ? currentWord.en : currentWord.uz} 
                                    {userInput.toLowerCase() === 
                                    (currentWord.lang === 'uz' ? currentWord.en.toLowerCase() : currentWord.uz.toLowerCase()) 
                                    ? ' ✅' : ' ❌'}
                                </Typography>
                            )}
                        </div>
                    )}
                    <Button variant="contained" color="primary" onClick={() => getRandomWord('en')} style={{ margin: '5px' }}>
                        English
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => getRandomWord('uz')} style={{ margin: '5px' }}>
                        Uzbek
                    </Button>
                    <Button variant="contained" onClick={checkAnswer} style={{ margin: '5px' }}>
                        Find
                    </Button>
                    <Button variant="contained" color="success" onClick={saveWord} style={{ margin: '5px' }}>
                        Save
                    </Button>
                    <Button variant="contained" color="warning" onClick={() => setAutoPlay(!autoPlay)} style={{ margin: '5px' }}>
                        {autoPlay ? 'Stop Auto' : 'Start Auto'}
                    </Button>
                    <Button variant="contained" color="info" onClick={() => setRandomMode(!randomMode)} style={{ margin: '5px' }}>
                        {randomMode ? 'Auto Random' : 'Auto Sequential'}
                    </Button>
                    <TextField
                        type="number"
                        value={intervalTime}
                        onChange={(e) => setIntervalTime(Number(e.target.value))}
                        label="Interval (ms)"
                        style={{ marginTop: '10px' }}
                    />
                </CardContent>
            </Card>

            {savedWords.length > 0 && (
                <Card style={{ marginTop: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Saqlangan so‘zlar</Typography>
                        <List>
                            {savedWords.map((word, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={`${word.en} - ${word.uz}`} />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            )}

            <IconButton
                onClick={() => setOpenDictionary(true)}
                style={{ position: 'fixed', bottom: 20, right: 20, background: '#1976d2', color: 'white' }}
            >
                <MenuBookIcon />
            </IconButton>

            <Dialog open={openDictionary} onClose={() => setOpenDictionary(false)} fullWidth maxWidth="md">
                <DialogTitle>📚 Lug‘at</DialogTitle>
                <DialogContent>
                    {words.reduce((acc, word, i) => {
                        if (i % 20 === 0) {
                            acc.push(
                                <Typography 
                                    key={`unit-${i}`} 
                                    variant="h6" 
                                    style={{ marginTop: '15px', fontWeight: 'bold' }}
                                >
                                    Unit {Math.floor(i / 20) + 1}
                                </Typography>
                            );
                        }
                        acc.push(
                            <Grid key={i} container spacing={2} style={{ padding: '5px' }}>
                                <Grid item xs={6}><Typography>{word.en}</Typography></Grid>
                                <Grid item xs={6}><Typography>{word.uz}</Typography></Grid>
                            </Grid>
                        );
                        return acc;
                    }, [])}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default App;
