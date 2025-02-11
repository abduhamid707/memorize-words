import React, { useState } from 'react';
import { Button, TextField, Typography, Card, CardContent, Container, List, ListItem, ListItemText } from '@mui/material';

const words = [
    { en: 'Growth', uz: "o‘sish" },
    { en: 'Built-up', uz: 'qurilgan' },
    { en: 'A shame', uz: 'uyat' },
    { en: 'Pity', uz: 'achinish, rahm' },
    { en: 'Region', uz: 'mintaqa' },
    { en: 'Substantial', uz: 'muhim' },
    { en: 'Impressive', uz: "ta’sirli" },
    { en: 'Semi-detached', uz: 'yarim bog‘langan' },
    { en: 'Original', uz: 'asli, dastlabki' },
    { en: 'Feature', uz: 'hususiyat, fazilat' },
    { en: 'Lead', uz: 'boshlamoq' },
    { en: 'Walled', uz: 'devor bilan qoplangan' },
    { en: 'Wall', uz: 'devor' },
    { en: 'Brick', uz: 'g‘isht' },
    { en: 'Stone', uz: 'tosh' },
    { en: 'Chimney', uz: 'mo‘ri' },
    { en: 'Roof', uz: 'tom' },
    { en: 'Shutter', uz: 'deraza eshigi' },
    { en: 'Hall', uz: 'zal' },
    { en: 'Passage', uz: 'yo‘lak' },
    { en: 'Corridor', uz: 'kalidor' },
    { en: 'Rubber tyre', uz: 'rezina shina' },
    { en: 'Woollen blanket', uz: 'jun ko‘rpa' },
    { en: 'Plastic toys', uz: 'plastik o‘yinchoqlar' },
    { en: 'Metal ladder', uz: 'metal narvon' },
    { en: 'Wax candle', uz: 'mum sham' },
    { en: 'Silver candlestick', uz: 'kumush shamdon' },
    { en: 'Gold medal', uz: 'oltin medal' },
    { en: 'Cardboard box', uz: 'karton quti' },
    { en: 'Steel pipe', uz: 'po‘lat truba' },
    { en: 'Concrete bridge', uz: 'beton ko‘prik' },
    { en: 'Iron railings', uz: 'temir panjaralar' },
    { en: 'Wooden fence', uz: 'yog‘och to‘siq' },
    { en: 'Circle', uz: 'doira' },
    { en: 'Round', uz: 'yumaloq' },
    { en: 'Spacious', uz: 'keng' },
    { en: 'Enormous', uz: 'katta, ulkan' },
    { en: 'Staircase', uz: 'zina, zinapoya' },
    { en: 'Attic', uz: 'cherdak, bolxona' },
    { en: 'Basement', uz: 'podval' },
    { en: 'Convert sth into sth', uz: 'nimanidir nimagadir o‘zgartirish' },
    { en: 'Separate', uz: 'ajralgan, alohida' },
    { en: 'Cellar', uz: 'yer to‘la' },
    { en: 'Currently', uz: 'hozirda, at the moment' },
    { en: 'Store sth', uz: 'nimanidir saqlab qo‘yish' },
    { en: 'Storage', uz: 'saqlash' },
    { en: 'Lawn', uz: 'gazon, maysazor' },
    { en: 'Drive', uz: 'xiyobon' },
    { en: 'Circular', uz: 'dumaloq' },
    { en: 'Square', uz: 'kvadrat' },
    { en: 'Rectangle', uz: 'to‘g‘ri to‘rtburchak' },
    { en: 'Rectangular', uz: 'to‘g‘ri to‘rtburchakli' },
    { en: 'Triangle', uz: 'uchburchak' },
    { en: 'Triangular', uz: 'uchburchakli' },
    { en: 'Oval', uz: 'oval' },
    { en: 'Point', uz: 'nuqta' },
    { en: 'Pointed', uz: 'nuqtali' },
    { en: 'Straight', uz: 'to‘g‘ri, tekis' },
    { en: 'Curved', uz: 'qavariq' },
    { en: 'Parallel', uz: 'parallel' },
    { en: 'Vertical', uz: 'tik' },
    { en: 'Diagonal', uz: 'diagonal' },
    { en: 'Shape', uz: 'shakl' },
    { en: 'Look', uz: 'qaramoq' },
    { en: 'Glance', uz: 'tez qaramoq' },
    { en: 'See', uz: 'ko‘rish' },
    { en: 'Watch', uz: 'tomosha qilish' },
    { en: 'Appear', uz: 'paydo bo‘lish' },
    { en: 'Disappear', uz: 'ko‘rinmay ketish' },
    { en: 'Stare', uz: 'tikilmoq' },
    { en: 'Notice', uz: 'sezmoq' },
    { en: 'Observant', uz: 'kuzatuvchi, ziyrak' },
    { en: 'Hear', uz: 'to‘satdan eshitib qolish' },
    { en: 'Sound like', uz: 'kabi ovoz' },
    { en: 'Listen', uz: 'eshitmoq, tinglamoq' },
    { en: 'Overhear', uz: 'bilmasdan eshitib qolish' },
    { en: 'Smell', uz: 'hidlamoq, hid taratmoq' },
    { en: 'Smell like sth', uz: 'nimagadir o‘xshab hid taralish' },
    { en: 'Stink', uz: 'sassiq hid' },
    { en: 'Flavour', uz: 'ta’m, mazza' },
    { en: 'Taste', uz: 'ta’mi, mazzasi' },
    { en: 'Salty', uz: 'sho‘r' },
    { en: 'Bland', uz: 'yumshoq' },
    { en: 'Touch', uz: 'ushlamoq' },
    { en: 'Feel', uz: 'his qilish' },
    { en: 'Damp', uz: 'nam' },
    { en: 'Feel like sth', uz: 'kabi his' },
    { en: 'Press', uz: 'bosmoq' },
    { en: 'Grab', uz: 'tortib olish' },
    { en: 'Tap', uz: 'teginish' },
    { en: 'Rub', uz: 'ishqalamoq' },
    { en: 'Illustrate', uz: 'ko‘rsatish, tasvirlab berish' },
    { en: 'Illustration', uz: 'rasm, tasvir' },
    { en: 'Scene', uz: 'sahna' },
    { en: 'Leisure', uz: 'bo‘sh vaqt' },
    { en: 'Industry', uz: 'sanoat' }
];


const App = () => {
    const [currentWord, setCurrentWord] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [savedWords, setSavedWords] = useState([]);

    const getRandomWord = (lang) => {
        const randomIndex = Math.floor(Math.random() * words.length);
        setCurrentWord({ ...words[randomIndex], lang });
        setUserInput('');
        setShowResult(false);
    };

    const checkAnswer = () => {
        setShowResult(true);
    };

    const saveWord = () => {
        if (currentWord) {
            setSavedWords([...savedWords, currentWord]);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px', textAlign: 'center' }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>Random</Typography>
                    {currentWord && (
                        <div>
                            <Typography variant="h6" gutterBottom>{currentWord.lang === 'uz' ? currentWord.uz : currentWord.en}</Typography>
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
                                    color={userInput.toLowerCase() === (currentWord.lang === 'uz' ? currentWord.en.toLowerCase() : currentWord.uz.toLowerCase()) ? 'success.main' : 'error.main'}
                                >
                                    {userInput} ➝ {currentWord.lang === 'uz' ? currentWord.en : currentWord.uz} {userInput.toLowerCase() === (currentWord.lang === 'uz' ? currentWord.en.toLowerCase() : currentWord.uz.toLowerCase()) ? '✅' : '❌'}
                                </Typography>
                            )}
                        </div>
                    )}
                    <Button variant="contained" color="primary" onClick={() => getRandomWord('en')} style={{ margin: '5px' }}>English</Button>
                    <Button variant="contained" color="secondary" onClick={() => getRandomWord('uz')} style={{ margin: '5px' }}>Uzbek</Button>
                    <Button variant="contained" onClick={checkAnswer} style={{ margin: '5px' }}>Find</Button>
                    <Button variant="contained" color="success" onClick={saveWord} style={{ margin: '5px' }}>Save</Button>
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
        </Container>
    );
};

export default App;
