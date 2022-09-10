const data = [
    { id: 1, title: 'The Godfather', rate: 9.2, description: 'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.' },
    { id: 2, title: 'Thor: Love and Thunder', rate: 6.6, description: 'Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.' },
    { id: 3, title: 'Turning Red', rate: 7.0, description: 'A 13-year-old girl named Meilin turns into a giant red panda whenever she gets too excited.' },
    { id: 4, title: 'Minions: The Rise of Gru', rate: 6.6, description: "The untold story of one twelve-year-old's dream to become the world's greatest supervillain." },
    { id: 5, title: 'Spider-Man: No Way Home', rate: 7.3, description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man."}
]

const list = () => {
    return [...data]
};

const find = (id) => {
    const movie = data.find(movie => movie.id === +id);
    return { ...movie };
}

module.exports = { list: list, find: find };