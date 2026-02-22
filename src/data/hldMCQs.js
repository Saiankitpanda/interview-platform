// ═══════════════════════════════════════════════════════════
// HLD MCQ Questions — System Design Multiple Choice
// ═══════════════════════════════════════════════════════════

export const hldMCQs = [
    {
        id: 'mcq-1',
        question: 'Which caching strategy writes data to both the cache and the database simultaneously?',
        options: ['Cache-Aside (Lazy Loading)', 'Write-Through', 'Write-Behind (Write-Back)', 'Read-Through'],
        correct: 1,
        explanation: '**Write-Through** writes data to both the cache and database at the same time. This ensures consistency but adds latency to writes. Cache-Aside loads data into cache only on a cache miss.',
        topic: 'Caching',
        difficulty: 'medium'
    },
    {
        id: 'mcq-2',
        question: 'According to the CAP theorem, which two guarantees can a distributed system provide during a network partition?',
        options: ['Consistency and Availability', 'Consistency and Partition Tolerance', 'Availability and Partition Tolerance', 'Either CP or AP (but not CA)'],
        correct: 3,
        explanation: 'During a network partition (P), a system must choose between **Consistency (CP)** or **Availability (AP)**. CA is not possible when partitions occur, which is inevitable in distributed systems.',
        topic: 'Distributed Systems',
        difficulty: 'medium'
    },
    {
        id: 'mcq-3',
        question: 'What is the primary purpose of a message queue (e.g., Kafka, RabbitMQ) in a microservices architecture?',
        options: ['To serve as the primary database', 'To provide synchronous communication between services', 'To decouple services and handle asynchronous communication', 'To replace load balancers'],
        correct: 2,
        explanation: 'Message queues **decouple producers from consumers** and enable asynchronous processing. This improves fault tolerance, allows services to scale independently, and handles traffic spikes through buffering.',
        topic: 'Messaging',
        difficulty: 'easy'
    },
    {
        id: 'mcq-4',
        question: 'Which database would be BEST suited for storing social media posts with a high write throughput and eventual consistency requirements?',
        options: ['PostgreSQL with strong consistency', 'Cassandra (AP system)', 'SQLite', 'Redis (in-memory only)'],
        correct: 1,
        explanation: '**Cassandra** is designed for high write throughput, horizontal scalability, and eventual consistency — perfect for social media write-heavy workloads. It uses a wide-column store model optimized for writes.',
        topic: 'Databases',
        difficulty: 'medium'
    },
    {
        id: 'mcq-5',
        question: 'What is the purpose of consistent hashing in distributed systems?',
        options: ['To encrypt data at rest', 'To minimize remapping when nodes are added/removed', 'To ensure ACID transactions', 'To compress data for network transfer'],
        correct: 1,
        explanation: '**Consistent hashing** maps data to a hash ring so that adding or removing nodes only requires remapping ~1/N of the keys (where N = number of nodes), instead of remapping everything.',
        topic: 'Load Balancing',
        difficulty: 'hard'
    },
    {
        id: 'mcq-6',
        question: 'Which pattern is used to break a large transaction into a sequence of local transactions across microservices?',
        options: ['Two-Phase Commit (2PC)', 'Saga Pattern', 'Circuit Breaker', 'Bulkhead Pattern'],
        correct: 1,
        explanation: 'The **Saga Pattern** breaks a distributed transaction into a sequence of local transactions. Each service performs its transaction and publishes an event/message. If one fails, compensating transactions undo previous steps.',
        topic: 'Microservices',
        difficulty: 'hard'
    },
    {
        id: 'mcq-7',
        question: 'A CDN (Content Delivery Network) primarily helps with:',
        options: ['Database query optimization', 'Reducing latency by serving content from edge locations', 'Encrypting data in transit', 'Rate limiting API requests'],
        correct: 1,
        explanation: 'CDNs cache content at **edge locations** geographically closer to users, reducing latency for static assets (images, CSS, JS). This also reduces load on origin servers.',
        topic: 'Infrastructure',
        difficulty: 'easy'
    },
    {
        id: 'mcq-8',
        question: 'What is "fan-out on write" in the context of a news feed system?',
        options: ['Writing data to multiple databases simultaneously', 'Pre-computing and pushing posts to followers\' timelines when a post is created', 'Distributing write load across shards', 'Compressing posts before writing'],
        correct: 1,
        explanation: '**Fan-out on write** (push model) pre-computes feeds by writing a post to every follower\'s timeline cache when it\'s created. Pros: fast reads. Cons: expensive for users with millions of followers.',
        topic: 'System Design Patterns',
        difficulty: 'hard'
    },
    {
        id: 'mcq-9',
        question: 'Which technique splits a database table across multiple servers based on a key?',
        options: ['Replication', 'Indexing', 'Sharding (Horizontal Partitioning)', 'Normalization'],
        correct: 2,
        explanation: '**Sharding** splits rows of a table across multiple database servers based on a shard key. Each shard holds a subset of the data, enabling horizontal scaling for large datasets.',
        topic: 'Databases',
        difficulty: 'medium'
    },
    {
        id: 'mcq-10',
        question: 'What does a rate limiter primarily protect against?',
        options: ['SQL injection attacks', 'Abuse, DDoS, and resource exhaustion', 'Data corruption', 'Network latency'],
        correct: 1,
        explanation: 'Rate limiters protect services from **abuse, DDoS attacks, and resource exhaustion** by limiting the number of requests a client can make within a time window.',
        topic: 'API Design',
        difficulty: 'easy'
    },
    {
        id: 'mcq-11',
        question: 'In a microservices architecture, what pattern prevents cascading failures when a downstream service is unresponsive?',
        options: ['Saga Pattern', 'Circuit Breaker', 'API Gateway', 'Service Mesh'],
        correct: 1,
        explanation: 'The **Circuit Breaker** pattern monitors failures. When failures exceed a threshold, it "opens" the circuit and returns fallback responses instead of waiting for the unresponsive service.',
        topic: 'Reliability',
        difficulty: 'medium'
    },
    {
        id: 'mcq-12',
        question: 'Which is the best approach for generating globally unique IDs in a distributed system?',
        options: ['Auto-increment in a single database', 'UUID v4', 'Twitter Snowflake IDs', 'Random 32-bit integers'],
        correct: 2,
        explanation: '**Snowflake IDs** are 64-bit, time-sortable, and guarantee uniqueness across distributed nodes. They combine timestamp + machine ID + sequence number. UUIDs work but are 128-bit and not sortable.',
        topic: 'Distributed Systems',
        difficulty: 'hard'
    },
    {
        id: 'mcq-13',
        question: 'What is the primary benefit of using an API Gateway?',
        options: ['It replaces all backend services', 'Single entry point for client requests with cross-cutting concerns', 'It eliminates the need for databases', 'It provides end-to-end encryption only'],
        correct: 1,
        explanation: 'An **API Gateway** provides a single entry point and handles cross-cutting concerns like authentication, rate limiting, logging, request routing, and protocol translation.',
        topic: 'API Design',
        difficulty: 'easy'
    },
    {
        id: 'mcq-14',
        question: 'Which replication strategy provides the lowest write latency but risks data loss?',
        options: ['Synchronous replication', 'Asynchronous replication', 'Semi-synchronous replication', 'Multi-leader replication'],
        correct: 1,
        explanation: '**Asynchronous replication** doesn\'t wait for replicas to acknowledge writes, giving lowest latency. However, if the primary fails before replication completes, recent writes can be lost.',
        topic: 'Databases',
        difficulty: 'medium'
    },
    {
        id: 'mcq-15',
        question: 'WebSocket connections are preferred over HTTP polling for real-time applications because:',
        options: ['They use less bandwidth and provide bidirectional communication', 'They are more secure than HTTPS', 'They don\'t require a server', 'They work without TCP/IP'],
        correct: 0,
        explanation: '**WebSockets** maintain a persistent, bidirectional connection. Unlike polling (repeated HTTP requests), WebSockets eliminate overhead and enable instant server-to-client pushes.',
        topic: 'Real-Time Systems',
        difficulty: 'medium'
    },
    {
        id: 'mcq-16',
        question: 'What is eventual consistency?',
        options: ['Data is always consistent across all nodes immediately', 'All replicas will converge to the same state given enough time without new updates', 'Data is never consistent', 'Consistency is guaranteed only during business hours'],
        correct: 1,
        explanation: '**Eventual consistency** guarantees that if no new updates are made, all replicas will converge to the same state. It trades immediate consistency for higher availability and lower latency.',
        topic: 'Distributed Systems',
        difficulty: 'medium'
    },
    {
        id: 'mcq-17',
        question: 'Which load balancing algorithm is best for ensuring sticky sessions?',
        options: ['Round Robin', 'Least Connections', 'IP Hash', 'Random'],
        correct: 2,
        explanation: '**IP Hash** maps client IPs to servers deterministically, ensuring the same client always reaches the same server (sticky sessions). Useful when session state is stored locally on the server.',
        topic: 'Load Balancing',
        difficulty: 'medium'
    },
    {
        id: 'mcq-18',
        question: 'What is the purpose of a bloom filter?',
        options: ['To sort data efficiently', 'To test whether an element is probably in a set (with possible false positives)', 'To encrypt data at rest', 'To compress images'],
        correct: 1,
        explanation: 'A **Bloom filter** is a space-efficient probabilistic data structure. It can tell you "definitely NOT in the set" or "PROBABLY in the set" (false positives possible, false negatives impossible).',
        topic: 'Data Structures',
        difficulty: 'hard'
    },
    {
        id: 'mcq-19',
        question: 'In back-of-the-envelope estimation, roughly how many seconds are in a day?',
        options: ['~8,600', '~86,400', '~864,000', '~8,640,000'],
        correct: 1,
        explanation: '24 hours × 60 minutes × 60 seconds = **86,400 seconds/day**. This is a crucial number for system design estimations (e.g., converting daily requests to QPS).',
        topic: 'Estimation',
        difficulty: 'easy'
    },
    {
        id: 'mcq-20',
        question: 'Which of the following is NOT a benefit of microservices architecture?',
        options: ['Independent deployment of services', 'Technology diversity per service', 'Simplified debugging and tracing', 'Team autonomy and parallel development'],
        correct: 2,
        explanation: 'Debugging and tracing become **more complex** in microservices due to distributed nature. You need distributed tracing tools (Jaeger, Zipkin) to follow requests across services.',
        topic: 'Microservices',
        difficulty: 'medium'
    }
];
