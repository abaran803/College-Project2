// import algoCode from '../data/algoCode';
// import algoData from '../data/algoData';
// import javaCode from '../data/codes/java';

import { algo1, algo2, algo3 } from '../data/codes/cpp/algos';
import { algo1 as javaAlgo1, algo2 as javaAlgo2, algo3 as javaAlgo3 } from '../data/codes/java/algos';
import { algo1 as pythonAlgo1, algo2 as pythonAlgo2, algo3 as pythonAlgo3 } from '../data/codes/python/algos';
// import pythonCode from '../data/codes/python';

const url = 'http://localhost:4000';

// Code to be shown based on language
export const getCodes = async (lang, algo) => {
    if(lang === 'C++') {
        return algo === 'ritm' ? algo1() : algo === 'nQueen' ? algo2() : algo3();
    } else if(lang === 'Java') {
        return algo === 'ritm' ? javaAlgo1() : algo === 'nQueen' ? javaAlgo2() : javaAlgo3();
    } else if(lang === 'Python') {
        return algo === 'ritm' ? pythonAlgo1() : algo === 'nQueen' ? pythonAlgo2() : pythonAlgo3();
    }
}

// Code to be used for algo working, only in JS
export const getAlgoCodes = async (algo) => {

}

// Contents and structuring of algo like input field, buttons etc.
export const getAlgoData = async (algo) => {

}

// Poster of the algo
export const getPoster = async (algo) => {
    if(algo === 'algo1') {

    } else if(algo === 'algo2') {

    } else if(algo === 'algo3') {

    }
}

export const login = async (email, password) => {
    const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({email, password}),
      });
      if(!response.ok) return false;
      return response.json();
}

export const signup = async (email, password, name) => {
    const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({email, password, name}),
      });
      if(!response.ok) return false;
      return response.json();
}