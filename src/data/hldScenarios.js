// ═══════════════════════════════════════════════════════════
// HLD Scenarios — Situation-Based System Design Questions
// ═══════════════════════════════════════════════════════════

export const hldScenarios = [
    {
        id: 'scenario-1',
        title: 'Database Overload',
        icon: '🔥',
        color: 'rose',
        situation: 'Your primary PostgreSQL database is hitting **50,000 QPS** during peak hours. Read latency has increased from 5ms to 500ms. The ops team is panicking. What do you do?',
        keyPoints: [
            'Add a caching layer (Redis/Memcached) for hot data',
            'Read replicas for read-heavy workload distribution',
            'Database query optimization and indexing',
            'Connection pooling to reduce overhead',
            'Consider sharding for long-term scalability'
        ],
        followUps: [
            'How would you decide which data to cache?',
            'What cache invalidation strategy would you use?',
            'How would you handle cache stampede?',
            'At what point would you consider sharding?'
        ],
        difficulty: 'hard'
    },
    {
        id: 'scenario-2',
        title: 'Cascading Failures',
        icon: '💥',
        color: 'amber',
        situation: 'Service A depends on Service B, which depends on Service C. Service C goes down, causing timeouts that propagate upstream, eventually taking down your entire platform. How do you prevent this?',
        keyPoints: [
            'Circuit breaker pattern to stop cascading failures',
            'Timeouts and retry budgets with exponential backoff',
            'Bulkhead pattern to isolate failures',
            'Graceful degradation with fallback responses',
            'Health checks and fast failure detection'
        ],
        followUps: [
            'How do you set appropriate timeout values?',
            'When should a circuit breaker transition from open to half-open?',
            'How do you test resilience patterns?',
            'What monitoring would you add?'
        ],
        difficulty: 'hard'
    },
    {
        id: 'scenario-3',
        title: 'Celebrity Problem',
        icon: '⭐',
        color: 'indigo',
        situation: 'A celebrity with **50 million followers** posts on your social media platform. Your fan-out-on-write system tries to insert the post into 50M timelines simultaneously. The system grinds to a halt. How do you fix this?',
        keyPoints: [
            'Hybrid push-pull model for high-follower users',
            'Fan-out on write for normal users, fan-out on read for celebrities',
            'Threshold-based approach (e.g., >10K followers = pull model)',
            'Async processing with priority queues',
            'Pre-computed hot user lists for optimization'
        ],
        followUps: [
            'How do you determine the follower threshold?',
            'How does this affect read latency for celebrity posts?',
            'How do you handle a user who suddenly goes viral?',
            'What caching strategies help here?'
        ],
        difficulty: 'hard'
    },
    {
        id: 'scenario-4',
        title: 'Data Inconsistency',
        icon: '🔄',
        color: 'emerald',
        situation: 'Your e-commerce platform shows an item as "in stock" on the product page, but when the user tries to checkout, it says "out of stock." Customers are furious. This happens because your inventory service uses eventual consistency. How do you solve this?',
        keyPoints: [
            'Strong consistency for critical paths (checkout)',
            'Optimistic locking with version numbers',
            'Reserve inventory on add-to-cart (temporary hold)',
            'Real-time inventory updates via event streaming',
            'Show "low stock" warnings instead of exact counts'
        ],
        followUps: [
            'How long should an inventory reservation last?',
            'What happens if the user abandons the cart?',
            'How do you handle flash sales with limited stock?',
            'Would you use a distributed lock? What are the tradeoffs?'
        ],
        difficulty: 'medium'
    },
    {
        id: 'scenario-5',
        title: 'Hot Partition',
        icon: '🌡️',
        color: 'rose',
        situation: 'Your DynamoDB table is sharded by `user_id`, but one user (a bot) is making **10,000 requests/second** to a single partition, causing throttling for legitimate users on the same partition. How do you handle this?',
        keyPoints: [
            'Rate limiting per user at the API gateway level',
            'Add a random suffix to shard keys to distribute load',
            'Use a write-ahead buffer (SQS) to absorb spikes',
            'Implement bot detection and blocking',
            'Consider adaptive capacity or partition splitting'
        ],
        followUps: [
            'How do you detect hot partitions in real-time?',
            'What monitoring alerts would you set up?',
            'How does this differ from hot key vs. hot partition?',
            'Would you redesign the partition key?'
        ],
        difficulty: 'hard'
    },
    {
        id: 'scenario-6',
        title: 'Global Expansion',
        icon: '🌍',
        color: 'cyan',
        situation: 'Your application is deployed in US-East only. You need to expand to Europe and Asia to reduce latency for international users from 300ms to under 50ms. How do you architect the multi-region deployment?',
        keyPoints: [
            'Multi-region deployment with regional databases',
            'Global load balancer with geo-routing (e.g., Route 53)',
            'CDN for static assets',
            'Cross-region replication with conflict resolution',
            'Data sovereignty compliance (GDPR for EU data)'
        ],
        followUps: [
            'How do you handle cross-region writes?',
            'What conflict resolution strategy would you use?',
            'How do you handle data residency requirements?',
            'Active-active vs. active-passive per region?'
        ],
        difficulty: 'hard'
    },
    {
        id: 'scenario-7',
        title: 'Payment Idempotency',
        icon: '💳',
        color: 'amber',
        situation: 'Users are reporting **double charges**. Investigation reveals that network timeouts cause the client to retry payment requests, and the server processes the same payment twice. How do you fix this?',
        keyPoints: [
            'Idempotency keys generated by the client',
            'Server-side deduplication with idempotency store',
            'Unique constraint on payment transaction IDs',
            'At-most-once processing semantics',
            'Response caching for retried requests'
        ],
        followUps: [
            'How long should you store idempotency keys?',
            'What happens if the server crashes between charging and storing the key?',
            'How do you handle partial failures in a multi-step payment process?',
            'Would you use the Saga pattern here?'
        ],
        difficulty: 'medium'
    },
    {
        id: 'scenario-8',
        title: 'Search at Scale',
        icon: '🔍',
        color: 'indigo',
        situation: 'Your e-commerce search is powered by SQL `LIKE` queries. With 100M products, search takes 5-10 seconds. Users are leaving. How do you build a fast, relevant search system?',
        keyPoints: [
            'Adopt Elasticsearch/OpenSearch for full-text search',
            'Inverted index for fast keyword matching',
            'Implement search relevance scoring (TF-IDF, BM25)',
            'Add autocomplete with edge n-grams',
            'Search result caching for popular queries'
        ],
        followUps: [
            'How do you keep the search index in sync with the database?',
            'How do you handle typos and fuzzy matching?',
            'How do you implement personalized search ranking?',
            'What is the difference between Elasticsearch and Solr?'
        ],
        difficulty: 'medium'
    },
    {
        id: 'scenario-9',
        title: 'Message Ordering',
        icon: '📨',
        color: 'emerald',
        situation: 'In your chat application, messages are appearing **out of order** for some users. User A sends "Hello" then "How are you?", but User B sees them in reverse. Your system uses multiple Kafka partitions for throughput. How do you fix this?',
        keyPoints: [
            'Use conversation_id as partition key (same chat → same partition)',
            'Kafka guarantees ordering within a partition',
            'Add sequence numbers to messages for client-side reordering',
            'Use vector clocks or Lamport timestamps for causal ordering',
            'Buffer and sort messages on the client before display'
        ],
        followUps: [
            'What if you need more throughput than a single partition provides?',
            'How do you handle messages from offline users?',
            'How does WhatsApp handle message ordering?',
            'What is the difference between total order and causal order?'
        ],
        difficulty: 'hard'
    },
    {
        id: 'scenario-10',
        title: 'Zero Downtime Deploy',
        icon: '🚀',
        color: 'cyan',
        situation: 'Your monolithic application requires **30 minutes of downtime** for each deployment. The business wants zero-downtime deployments. Your database schema changes are breaking backward compatibility. How do you achieve this?',
        keyPoints: [
            'Blue-green deployment strategy',
            'Rolling deployments with health checks',
            'Backward-compatible database migrations (expand-contract)',
            'Feature flags for gradual rollout',
            'Canary deployments to test with a small percentage of traffic'
        ],
        followUps: [
            'How do you handle database migrations that are not backward-compatible?',
            'What is the expand-contract pattern?',
            'How do you roll back a failed deployment?',
            'How do feature flags help with deployment safety?'
        ],
        difficulty: 'medium'
    }
];

// Chat responses for the AI-style interactive system
export const chatResponses = {
    greetings: [
        "Hey! 👋 I'm your HLD practice assistant. Ask me anything about system design — scaling, databases, caching, architecture patterns, or give me a scenario to discuss!",
    ],
    topics: {
        caching: {
            keywords: ['cache', 'caching', 'redis', 'memcached', 'cdn'],
            responses: [
                "Great topic! **Caching** is fundamental to system design. Here are the key strategies:\n\n" +
                "1. **Cache-Aside (Lazy Loading)**: App checks cache first, loads from DB on miss\n" +
                "2. **Write-Through**: Write to cache AND DB simultaneously\n" +
                "3. **Write-Behind**: Write to cache, async write to DB\n" +
                "4. **Read-Through**: Cache automatically loads from DB on miss\n\n" +
                "🤔 **Follow-up**: Which strategy would you use for a social media feed? Why?",

                "Let me ask you a scenario:\n\n" +
                "You have a product catalog with 1M items. 80% of traffic hits the top 1000 items. How would you design your caching layer?\n\n" +
                "Think about: TTL, eviction policy, cache warming, and invalidation."
            ]
        },
        database: {
            keywords: ['database', 'db', 'sql', 'nosql', 'postgres', 'mongo', 'cassandra', 'dynamo', 'sharding', 'replication'],
            responses: [
                "**Database selection** is a critical design decision! Let me break it down:\n\n" +
                "| Need | Best Choice |\n" +
                "|------|-------------|\n" +
                "| ACID, relational | PostgreSQL, MySQL |\n" +
                "| High write throughput | Cassandra, DynamoDB |\n" +
                "| Flexible schema | MongoDB |\n" +
                "| Graph relationships | Neo4j |\n" +
                "| Time series | InfluxDB, TimescaleDB |\n" +
                "| Search | Elasticsearch |\n\n" +
                "🤔 **Question**: If you're designing a ride-sharing app like Uber, which databases would you use for different parts of the system?",

                "Let's dive into **sharding** strategies:\n\n" +
                "- **Hash-based**: Distribute by hash(key) % N\n" +
                "- **Range-based**: Partition by value ranges (e.g., dates)\n" +
                "- **Geographic**: Shard by region\n" +
                "- **Directory-based**: Lookup table maps keys to shards\n\n" +
                "🤔 **Scenario**: Your user table has 500M rows. What shard key would you choose and why?"
            ]
        },
        scaling: {
            keywords: ['scale', 'scaling', 'load balancer', 'horizontal', 'vertical', 'throughput', 'qps', 'performance'],
            responses: [
                "**Scaling** is the bread and butter of system design! Here's my framework:\n\n" +
                "**Vertical Scaling** (Scale Up):\n- Bigger machine, more RAM/CPU\n- Simpler, but has a ceiling\n\n" +
                "**Horizontal Scaling** (Scale Out):\n- Add more machines\n- Requires stateless design\n- Load balancer distributes traffic\n\n" +
                "**Key patterns to know:**\n" +
                "1. Stateless services (store state externally)\n" +
                "2. Database read replicas\n" +
                "3. Caching layers\n" +
                "4. Async processing with queues\n" +
                "5. CDN for static content\n\n" +
                "🤔 Your turn: Walk me through how you'd scale a chat application from 1K to 10M users."
            ]
        },
        microservices: {
            keywords: ['microservice', 'monolith', 'service', 'api gateway', 'decompos'],
            responses: [
                "**Microservices vs Monolith** is a classic interview topic!\n\n" +
                "**Start with a Monolith** when:\n- Small team (<10 devs)\n- MVP/startup stage\n- Well-understood domain\n\n" +
                "**Move to Microservices** when:\n- Independent deployments needed\n- Different scaling requirements per feature\n- Multiple teams need autonomy\n\n" +
                "**Key challenges of microservices:**\n" +
                "- Distributed tracing & debugging\n" +
                "- Data consistency across services\n" +
                "- Network latency overhead\n" +
                "- Service discovery & orchestration\n\n" +
                "🤔 **Question**: How would you decompose an e-commerce monolith into microservices? What services would you extract first?"
            ]
        },
        consistency: {
            keywords: ['consistency', 'cap', 'eventual', 'strong', 'acid', 'base', 'partition'],
            responses: [
                "**Consistency** is where system design gets really interesting!\n\n" +
                "**CAP Theorem** — During a network partition, choose:\n" +
                "- **CP**: Consistency (reject requests if uncertain)\n" +
                "- **AP**: Availability (serve potentially stale data)\n\n" +
                "**Real-world examples:**\n" +
                "- 💰 Banking → CP (never show wrong balance)\n" +
                "- 📱 Social media likes → AP (eventual consistency OK)\n" +
                "- 🛒 Inventory → Depends on the operation (browse = AP, checkout = CP)\n\n" +
                "🤔 **Scenario**: You're designing a collaborative document editor like Google Docs. Which consistency model do you use? How do you handle conflicts?"
            ]
        },
        general: {
            responses: [
                "That's a great question! Let me think about this from a system design perspective.\n\n" +
                "When approaching any HLD problem, I recommend this framework:\n\n" +
                "1. **Clarify Requirements** — Functional + Non-functional\n" +
                "2. **Estimate Scale** — Users, QPS, storage\n" +
                "3. **High-Level Design** — Components, data flow\n" +
                "4. **Deep Dive** — Database, caching, scaling\n" +
                "5. **Discuss Tradeoffs** — CAP, cost, complexity\n\n" +
                "What specific area would you like to explore? I can discuss caching, databases, load balancing, messaging, microservices, or walk through a full system design!",

                "Interesting point! Here's how I'd approach it:\n\n" +
                "Key things to consider in any system design:\n" +
                "- **Availability**: How many 9s do you need?\n" +
                "- **Latency**: p50, p95, p99 targets?\n" +
                "- **Throughput**: Peak QPS estimations\n" +
                "- **Consistency**: Strong vs eventual?\n" +
                "- **Cost**: Can you justify the infrastructure?\n\n" +
                "Want to deep-dive into any of these dimensions? Or give me a specific system to design!"
            ]
        }
    }
};
