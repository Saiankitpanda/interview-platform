// ═══════════════════════════════════════════════════════════
// LLD Resources — Curated Books & GitHub Repositories
// ═══════════════════════════════════════════════════════════

export const LLD_BOOKS = [
    {
        id: 'head-first-design-patterns',
        title: 'Head First Design Patterns',
        author: 'Eric Freeman & Elisabeth Robson',
        cover: '📗',
        color: 'emerald',
        difficulty: 'Beginner',
        description: 'A brain-friendly guide to design patterns using Java. Perfect starting point for OOP & pattern recognition.',
        topics: ['Factory', 'Observer', 'Decorator', 'Strategy', 'Singleton'],
        rating: 4.8,
        pdfLink: 'https://ia801309.us.archive.org/5/items/head-first-design-patterns-by-eric-freeman-elisabeth-robson/Head%20First%20Design%20Patterns%20by%20Eric%20Freeman%2C%20Elisabeth%20Robson.pdf',
        pages: 694
    },
    {
        id: 'design-patterns-gof',
        title: 'Design Patterns: Elements of Reusable OO Software',
        author: 'Gang of Four (GoF)',
        cover: '📕',
        color: 'rose',
        difficulty: 'Intermediate',
        description: 'The classic "Gang of Four" book. Definitive catalogue of 23 design patterns every engineer must know.',
        topics: ['Creational', 'Structural', 'Behavioral', 'Abstract Factory', 'Composite'],
        rating: 4.7,
        pdfLink: 'https://github.com/TushaarGVS/Design-Patterns-Mentorship/blob/master/Erta%20Gamma%2C%20Richard%20Helm%2C%20Ralph%20Johnson%2C%20John%20Vlissides-Design%20Patterns_%20Elements%20of%20Reusable%20Object-Oriented%20Software%20%20-Addison-Wesley%20Professional%20(1994).pdf',
        pages: 395
    },
    {
        id: 'clean-code',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        cover: '📘',
        color: 'indigo',
        difficulty: 'Beginner',
        description: 'Principles for writing readable, maintainable code. Essential for writing quality LLD solutions.',
        topics: ['Naming', 'Functions', 'Error Handling', 'Testing', 'Refactoring'],
        rating: 4.6,
        pdfLink: 'https://github.com/jnguyen095/clean-code/blob/master/Clean.Code.A.Handbook.of.Agile.Software.Craftsmanship.pdf',
        pages: 464
    },
    {
        id: 'clean-architecture',
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        cover: '📙',
        color: 'amber',
        difficulty: 'Intermediate',
        description: 'Learn how to structure software so it is easy to build, maintain, and extend. SOLID principles in depth.',
        topics: ['SOLID', 'Components', 'Architecture', 'Boundaries', 'Layers'],
        rating: 4.5,
        pdfLink: 'https://github.com/GunterMueller/Books-3/blob/master/Clean%20Architecture%20A%20Craftsman%20Guide%20to%20Software%20Structure%20and%20Design.pdf',
        pages: 432
    },
    {
        id: 'oop-thought-process',
        title: 'The Object-Oriented Thought Process',
        author: 'Matt Weisfeld',
        cover: '📓',
        color: 'cyan',
        difficulty: 'Beginner',
        description: 'Foundational OOP mindset — thinking in objects. Great for building the mental model for LLD.',
        topics: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Composition', 'Abstraction'],
        rating: 4.3,
        pdfLink: 'https://archive.org/details/objectorientedth0000weis',
        pages: 336
    },
    {
        id: 'refactoring',
        title: 'Refactoring: Improving the Design of Existing Code',
        author: 'Martin Fowler',
        cover: '📒',
        color: 'indigo',
        difficulty: 'Intermediate',
        description: 'Master the art of refactoring — restructuring code without changing behavior. Key for LLD interviews.',
        topics: ['Code Smells', 'Extract Method', 'Move Method', 'Replace Conditional', 'Composing Methods'],
        rating: 4.7,
        pdfLink: 'https://github.com/gg-daddy/ebooks/blob/master/erta%20Fowler%20-%20Refactoring%20-%20Improving%20the%20Design%20of%20Existing%20Code.pdf',
        pages: 448
    },
    {
        id: 'design-patterns-java',
        title: 'Design Patterns in Java',
        author: 'Steven John Metsker',
        cover: '📕',
        color: 'rose',
        difficulty: 'Intermediate',
        description: 'Practical Java implementations of design patterns with real-world examples and exercises.',
        topics: ['Iterator', 'Adapter', 'Facade', 'Template Method', 'Chain of Responsibility'],
        rating: 4.2,
        pdfLink: 'https://github.com/ajitpal/BookBank/blob/master/%5BDesign%20Patterns%20in%20Java(2nd)%5D.Steven.John.Metsker.pdf',
        pages: 480
    },
    {
        id: 'design-patterns-python',
        title: 'Mastering Python Design Patterns',
        author: 'Kamon Ayeva & Sakis Kasampalis',
        cover: '📗',
        color: 'emerald',
        difficulty: 'Intermediate',
        description: 'Pythonic implementations of classic and modern design patterns for Python developers.',
        topics: ['Builder', 'Prototype', 'Proxy', 'MVC', 'Microservices Patterns'],
        rating: 4.1,
        pdfLink: 'https://github.com/gg-daddy/ebooks/blob/master/Mastering%20Python%20Design%20Patterns.pdf',
        pages: 238
    }
];

export const LLD_GITHUB_REPOS = [
    {
        id: 'awesome-lld',
        name: 'ashishps1/awesome-low-level-design',
        description: 'Learn Low Level Design (LLD) and prepare for interviews. Covers parking lot, elevator, library management, and more.',
        stars: '7.8k+',
        color: 'emerald',
        topics: ['Design Patterns', 'SOLID', 'OOP', 'Interview Problems'],
        link: 'https://github.com/ashishps1/awesome-low-level-design'
    },
    {
        id: 'oop-design',
        name: 'tssovi/gof-design-patterns',
        description: 'Gang of Four Design Patterns implemented in multiple languages with clear UML diagrams.',
        stars: '3.2k+',
        color: 'indigo',
        topics: ['GoF Patterns', 'UML', 'Multi-Language', 'Examples'],
        link: 'https://github.com/tssovi/gof-design-patterns'
    },
    {
        id: 'design-patterns-for-humans',
        name: 'kamranahmedse/design-patterns-for-humans',
        description: 'An ultra-simplified explanation of design patterns. Makes complex concepts dead simple.',
        stars: '45k+',
        color: 'amber',
        topics: ['Simple Explanations', 'Real-World Analogies', 'PHP Examples', 'All 23 Patterns'],
        link: 'https://github.com/kamranahmedse/design-patterns-for-humans'
    },
    {
        id: 'java-design-patterns',
        name: 'iluwatar/java-design-patterns',
        description: 'Comprehensive collection of design patterns implemented in Java. One of the most starred Java repos.',
        stars: '90k+',
        color: 'rose',
        topics: ['Java', 'Enterprise Patterns', 'Concurrency', 'Microservices'],
        link: 'https://github.com/iluwatar/java-design-patterns'
    },
    {
        id: 'refactoring-guru',
        name: 'RefactoringGuru/design-patterns',
        description: 'Code examples from refactoring.guru in multiple languages. Great for interview prep.',
        stars: '2.5k+',
        color: 'cyan',
        topics: ['TypeScript', 'Python', 'Java', 'C++', 'Go'],
        link: 'https://github.com/RefactoringGuru/design-patterns'
    },
    {
        id: 'lld-machine-coding',
        name: 'kumaransg/LLD',
        description: 'Low Level Design problems asked in FAANG and top product companies with full solutions.',
        stars: '1.5k+',
        color: 'emerald',
        topics: ['TicTacToe', 'Parking Lot', 'Splitwise', 'BookMyShow'],
        link: 'https://github.com/kumaransg/LLD'
    },
    {
        id: 'python-patterns',
        name: 'faif/python-patterns',
        description: 'Collection of design patterns and idioms in Python. Clean, Pythonic implementations.',
        stars: '40k+',
        color: 'indigo',
        topics: ['Behavioral', 'Creational', 'Structural', 'Fundamental'],
        link: 'https://github.com/faif/python-patterns'
    },
    {
        id: 'system-design-primer',
        name: 'donnemartin/system-design-primer',
        description: 'Includes OOP design patterns section alongside system design. Great for holistic interview prep.',
        stars: '280k+',
        color: 'amber',
        topics: ['OOP', 'System Design', 'Scalability', 'Interview Prep'],
        link: 'https://github.com/donnemartin/system-design-primer'
    }
];

export const LLD_TOPICS = [
    { name: 'SOLID Principles', icon: '🧱', description: 'Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion' },
    { name: 'Design Patterns', icon: '🎨', description: 'Creational, Structural, and Behavioral patterns from the GoF catalogue' },
    { name: 'OOP Concepts', icon: '🔮', description: 'Encapsulation, Abstraction, Inheritance, Polymorphism, Composition' },
    { name: 'UML Diagrams', icon: '📐', description: 'Class diagrams, sequence diagrams, state diagrams for communicating designs' },
    { name: 'Machine Coding', icon: '⌨️', description: 'Build working code: Parking Lot, Elevator, Snake Game, BookMyShow, etc.' },
    { name: 'Code Quality', icon: '✨', description: 'Clean code, KISS, DRY, YAGNI, refactoring techniques' }
];
