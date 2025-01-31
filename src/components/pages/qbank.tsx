import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Qbank = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 5;

  useEffect(() => {
    const fetchQuizzes = async () => {
      const db = getFirestore();
      const colRef = collection(db, "quizzes");

      try {
        const snapshot = await getDocs(colRef);
        let quizzesData: any[] = [];
        snapshot.docs.forEach((doc) => {
          quizzesData.push({ ...doc.data(), id: doc.id });
        });
        console.log("Fetched quizzes:", quizzesData); // Debugging line
        setQuizzes(quizzesData);

        // Initialize collapsed state to true for all questions
        const initialCollapsedState: { [key: string]: boolean } = {};
        quizzesData.forEach((quiz) => {
          quiz.quiz.forEach((_: any, index: number) => {
            initialCollapsedState[`${quiz.id}-${index}`] = true;
          });
        });
        setCollapsed(initialCollapsedState);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchQuizzes();
  }, []);

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(quizzes.length / quizzesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ marginLeft: '16px', padding: '16px' }}>
      <h1>Quizzes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {currentQuizzes.length === 0 ? (
          <p>No quizzes available</p>
        ) : (
          currentQuizzes.map((quiz) => (
            <div key={quiz.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', width: '300px' }}>
              <h2>{quiz.title || "Untitled Quiz"}</h2>
              {quiz.quiz && quiz.quiz.map((question: any, index: number) => (
                <div key={`${quiz.id}-${index}`} style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '8px', margin: '8px 0' }}>
                  <h3 onClick={() => toggleCollapse(`${quiz.id}-${index}`)} style={{ cursor: 'pointer' }}>
                    Question {index + 1}
                  </h3>
                  {!collapsed[`${quiz.id}-${index}`] && (
                    <>
                      <p><strong>Question:</strong> {question.question}</p>
                      {question.options && (
                        <>
                          <p><strong>Options:</strong></p>
                          <ul>
                            {Object.entries(question.options)
                              .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                              .map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
                              ))}
                          </ul>
                        </>
                      )}
                      <p><strong>Answer:</strong> {question.answer}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            style={{
              margin: '0 4px',
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: currentPage === number ? '#007bff' : '#f0f0f0',
              color: currentPage === number ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Qbank;