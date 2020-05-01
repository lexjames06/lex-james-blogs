import React, { useState, useEffect } from 'react';

import './Tag.css';
import axios from 'axios';

export default function Tag({ tagName }) {
    const [tag, setTag] = useState('');
    const [color, setColor] = useState('');

    function getRandomColor() {
        const colorCharacters = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
        ];
        const randomColor = ['#'];
        for (let i = 0; i < 6; i++) {
            const character = Math.floor(Math.random() * 16);
            randomColor.push(colorCharacters[character]);
        }
        return randomColor.join('');
    }

    async function saveTagColor() {

        const tagColor = getRandomColor();

        setTag(tagName);
        setColor(tagColor);

        const newTag = {
            name: tagName,
            color: tagColor,
        };

        axios
            .post('http://localhost:3001/tags/add', newTag)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ', err));
    }

    useEffect(() => {
        async function fetchData() {

            fetch(`/tags/${tagName.toLowerCase()}`)
                .then(res => res.json())
                .then(data => {
                    let tagDataName = data[0].name;
                    let tagDataColor = data[0].color;
                    setTag(tagDataName);
                    setColor(tagDataColor);
                    console.log(tagDataName)
                    console.log(tagDataColor)
                })
                // .then(() => {
                //     if (tag === '') {
                //         setTag(tagName);
                //         setColor(getRandomColor());
                //         saveTagColor();
                //     }
                // })
                .catch(() => {
                    saveTagColor();
                });
                // .catch(err => console.log('Error: ' + err));
        }
        fetchData();
    }, [tagName]);

    return <div style={{ 'color': `${color}` }}>{tag}</div>;
}
