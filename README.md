#  Agent Maker – Visual AI Agent Builder Platform

> Build, customize, and deploy AI agents visually using drag-and-drop workflows powered by Large Language Models (LLMs).

##  Overview

Agent Maker is a no-code/low-code AI Agent Builder that enables users to design intelligent AI agents through an intuitive visual workflow editor. Instead of writing complex orchestration logic, users can connect nodes representing different actions such as prompts, API calls, conditions, and outputs to create powerful autonomous AI agents.

The platform combines a modern React-based interface with LLM-powered reasoning to make AI agent development accessible to developers, students, startups, and businesses.

---

## 🎥 Demo

📹 **Demo Video:** https://www.loom.com/share/8220f88d79044c38af22143922140acf


## ✨ Features

* 🎨 Drag-and-drop visual workflow builder
* 🤖 AI-powered autonomous agents
* 🔗 API integration nodes
* 🌐 External REST API support
* 🧠 LLM-powered reasoning using Groq
* 🔀 Conditional execution workflows
* 👤 Secure authentication with Clerk
* 💾 Persistent workflow storage using Convex
* ⚡ Real-time workflow editing
* 📱 Responsive modern UI
* 🔒 Secure user authentication
* 🎯 Modular and extensible node architecture

---

# 🏗 Architecture

```
                User
                  │
                  ▼
      ┌─────────────────────┐
      │  Next.js Frontend   │
      │ React + TypeScript  │
      └──────────┬──────────┘
                 │
         Drag & Drop Builder
                 │
                 ▼
          Workflow Engine
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
  Condition     API       Prompt
    Node        Node       Node
                 │
                 ▼
            Groq LLM API
                 │
                 ▼
         AI Generated Response

                 │
                 ▼

            Convex Database
```

---

# 🛠 Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Flow
* Framer Motion

## Backend

* Convex
* Clerk Authentication
* REST APIs

## AI

* Groq API
* LLM Integration
* Prompt Engineering
* AI Agent Workflows

## Tools

* Git
* GitHub
* VS Code

---

# 📂 Project Structure

```
AgentMaker/

├── app/
├── components/
├── hooks/
├── lib/
├── providers/
├── public/
├── convex/
├── actions/
├── constants/
├── types/
├── styles/
└── README.md
```

---

# 🚀 How It Works

1. User signs in using Clerk Authentication.
2. User creates a new AI Agent.
3. User visually designs the workflow.
4. Nodes are connected to define execution flow.
5. Prompts and APIs are configured.
6. Workflow is executed.
7. Groq processes the request.
8. AI returns intelligent responses.
9. Agent configuration is stored in Convex.

---

# 🔄 Workflow Example

```
Start
   │
   ▼
Prompt Node
   │
   ▼
Condition Node
   │
 ┌─┴────────────┐
 │              │
 ▼              ▼
API Call      LLM
 │              │
 └──────┬───────┘
        ▼
     End Node
```

---

# 💡 Example Use Cases

* Customer Support Agent
* Travel Assistant
* Interior Design Assistant
* Document Q&A
* FAQ Bot
* Research Assistant
* API Automation
* Workflow Automation
* Business Process Automation

---


# ⚙ Installation

Clone the repository


git clone https://github.com/prabhusatwika/ai-agent-builder-platform.git


Go to project



Install dependencies
npm install

Run development server
npm run dev

Open
http://localhost:3000
---

# 🔑 Environment Variables

Create a `.env.local`

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=

GROQ_API_KEY=


---

# 🧠 AI Features

* Prompt Engineering
* LLM Integration
* AI Agent Orchestration
* Dynamic Workflow Execution
* Conversational Reasoning
* Tool Calling
* API-based Knowledge Retrieval

---

# 📈 Future Enhancements

* Multi-Agent Collaboration
* RAG Integration
* Vector Database Support
* Memory Management
* Voice AI
* LangGraph Support
* OpenAI Agents SDK
* Streaming Responses
* Agent Marketplace
* Workflow Templates

---

# 🎯 Learning Outcomes

This project helped me gain practical experience with:

* Full-stack application development
* AI agent architecture
* Prompt engineering
* Workflow orchestration
* Authentication systems
* Backend development
* State management
* Database integration
* REST APIs
* Modern React development

---

# 👨‍💻 Author

**Machavarapu Prabhu Satwika**

GitHub:
https://github.com/prabhusatwika

LinkedIn:
https://linkedin.com/in/prabhu-satwika-machavarapu25

Email:
[prabhusatwika25@gmail.com](mailto:prabhusatwika25@gmail.com)

---

## ⭐ If you found this project interesting, consider giving it a star!
