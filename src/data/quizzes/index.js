const quizzes = [
    {
        algoName: 'nQuees',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 1
            }
        ]
    },
    {
        algoName: 'ritm',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 3
            }
        ]
    },
    {
        algoName: 'ritm',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 2
            }
        ]
    },
    {
        algoName: 'nQuees',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 3
            }
        ]
    },
    {
        algoName: 'sudoku',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 3
            }
        ]
    },
    {
        algoName: 'nQuees',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 4
            }
        ]
    },
    {
        algoName: 'sudoku',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 4
            }
        ]
    },
    {
        algoName: 'sudoku',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 2
            }
        ]
    },
    {
        algoName: 'nQuees',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 3
            }
        ]
    },
    {
        algoName: 'nQuees',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 1
            }
        ]
    },
    {
        algoName: 'nQuees',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 4
            }
        ]
    },
    {
        algoName: 'ritm',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 2
            }
        ]
    },
    {
        algoName: 'ritm',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 1
            }
        ]
    },
    {
        algoName: 'sudoku',
        questions: [
            {
                que: 'What is your name?',
                options: [
                    'NameA', 'NameB', 'NameC', 'NameD'
                ],
                correctIndex: 2
            }
        ]
    },
]

const getQuiz = async (algoName) => {
    return await quizzes.filter(item => item.algoName === algoName);
}

export default getQuiz;