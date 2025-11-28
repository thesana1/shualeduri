import { useEffect, useState } from 'react'
import './App.css'
import React from 'react'
import { motion } from 'motion/react'

function App() {
  const [searchWord, setSearchWord] = useState('keyboard')
  const [searchedData, setSearchedData] = useState(null)
  const [isError, setIsError] = useState(false)
  const [notFound, setNotFound] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [dark, setDark] = useState(false)

  const handleFontChange = (e) => {
    document.body.style.fontFamily = e.target.value
  }

  useEffect(() => {
    getWord()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!searchWord.trim()) {
      setSearchedData(null)
      setIsError(true)
      return
    } else {
      setIsError(false)
    }
    await getWord()
  }

  async function getWord() {
    const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
    const data = await resp.json()

    if (resp.status === 404) {
      setNotFound(data.message)
      setSearchedData(null)
      return
    }

    let formatted = null
    data.forEach(el => {
      const res = el.phonetics.find(p => p.audio)
      if (res) formatted = { ...el, phonetics: res }
    })

    setSearchedData(formatted)
  }

  const handlePlaySound = () => {
    if (isPlaying || !searchedData?.phonetics?.audio) return
    const sound = new Audio(searchedData.phonetics.audio)
    setIsPlaying(true)
    sound.play()
    sound.onended = () => {
      setIsPlaying(false)
    }
  }

  return (
    <div className={`${dark ? "bg-black text-white" : "bg-white text-black"} w-full flex flex-col items-center min-h-screen px-4`}>

      <header className="p-4 flex items-center justify-between w-full max-w-6xl">
        <img src="src/assets/iconoir_book.png" alt="logo" className="h-10 w-10" />

        <div className="flex items-center gap-4">
          <select
            onChange={handleFontChange}
            className={`p-2 rounded border-0 outline-none ${dark ? "bg-black text-white" : "-white bg-black"}`}
          >
            <option className='bg-white text-black' value="sans-serif">Sans Serif</option>
            <option className='bg-white text-black' value="serif">Serif</option>
            <option className='bg-white text-black' value="monospace">Mono</option>
          </select>

          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 rounded-xl border"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className='w-full max-w-xl mt-10'>
        <input
          type="text"
          placeholder='keyboard'
          className={`border w-full p-4 md:p-3 text-lg md:text-base rounded-xl focus:outline-none x1 ${
            isError ? 'border-red-500' : dark ? 'border-gray-700 bg-black text-white' : 'border-white'
          }`}
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <p className="text-red-500 h-4 mt-1">
          {isError ? 'Woops, cannot be empty' : ''}
        </p>
      </form>

      {!searchedData ? (
        <h1 className="text-center text-2xl mt-10">
          {notFound || 'Oops… nothing found'}
        </h1>
      ) : (
        <div className={`w-full max-w-xl rounded-2xl p-6 mt-10 ${dark ? "bg-gray-900" : ""}`}>

          <div className="flex justify-between items-center">
            <div>
              <h1 className='text-4xl md:text-5xl font-bold'>{searchedData.word}</h1>
              <h3 className='text-xl md:text-2xl text-purple-500 mt-1'>
                {searchedData.phonetic}
              </h3>
            </div>

            <button
              onClick={handlePlaySound}
              disabled={isPlaying}
              className='w-12 h-12 md:w-14 md:h-14 rounded-full bg-purple-300 flex items-center justify-center text-white hover:bg-purple-400 disabled:bg-purple-200 disabled:cursor-not-allowed'
            >
              ▶
            </button>
          </div>

          {searchedData.meanings.map((el, index) => (
            <div key={index} className='mt-6 md:mt-8'>
              <h1 className='font-bold text-xl'>{el.partOfSpeech}</h1>

              <p className='mt-3 text-gray-500'>Meaning</p>

              <ul className='list-disc ml-6 mt-2'>
                {el.definitions.map((d, i) => (
                  <li key={i} className='mb-1'>
                    {d.definition}
                  </li>
                ))}
              </ul>

              {el.synonyms?.length > 0 && (
                <p className='mt-3 text-purple-500 font-semibold'>
                  Synonyms:
                  <span className='underline ml-1'>{el.synonyms.join(', ')}</span>
                </p>
              )}
            </div>
          ))}

          <p className='mt-8 text-gray-600'>
            Source:{' '}
            <a
              href={searchedData.sourceUrls[0]}
              className='text-blue-500 underline'
              target='_blank'
            >
              {searchedData.sourceUrls[0]}
            </a>
          </p>

        </div>
      )}
    </div>
  )
}

export default App
