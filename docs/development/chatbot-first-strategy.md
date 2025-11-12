# Chatbot-First User Engagement Strategy

**Last Updated**: November 8, 2025  
**Status**: ✅ ACTIVE - Implemented on Services, Booking, and Careers pages  
**Strategic Decision**: Replace static FAQs with interactive AI chatbot engagement

---

## 🎯 Strategy Overview

We've adopted a **chatbot-first approach** to user engagement, replacing traditional
static FAQ sections with interactive chatbot call-to-actions (CTAs) that provide
personalized, context-aware assistance.

### Why Chatbot-First?

Traditional static FAQs have several limitations:

- ❌ Generic answers that don't address specific user contexts
- ❌ Limited interactivity - no follow-up questions
- ❌ High maintenance burden - update FAQs on multiple pages
- ❌ No lead capture during the help process
- ❌ No analytics on what users actually want to know
- ❌ Lower conversion rates

**Chatbot-first engagement solves all of these:**

- ✅ **Personalized Responses**: Context-aware answers tailored to the user's specific needs
- ✅ **Interactive Conversations**: Users can ask follow-up questions naturally
- ✅ **Lead Capture**: Collect contact information while helping users
- ✅ **24/7 Availability**: Instant responses any time of day
- ✅ **Better Analytics**: Track real user questions and pain points
- ✅ **Easy Maintenance**: Update chatbot training once, benefits all pages
- ✅ **Higher Conversion**: Guide users directly to booking, applying, or contacting

---

## 🚀 Implementation

### Component: ChatbotCTASection

The `ChatbotCTASection` component provides a consistent, reusable interface for chatbot engagement:

```tsx
import { ChatbotCTASection } from "@/components/chatbot";

<ChatbotCTASection
  context="services" // Page context for chatbot
  exampleQuestions={[
    "What are your payment terms?",
    "Do you offer warranties?",
    "What's your safety record?",
    "How long do projects typically take?",
    "Are you licensed and insured?",
  ]}
/>;
```

### Props

| Prop               | Type       | Required | Description                                           |
| ------------------ | ---------- | -------- | ----------------------------------------------------- |
| `context`          | `string`   | Yes      | Page context (e.g., "services", "booking", "careers") |
| `exampleQuestions` | `string[]` | Yes      | 4-6 example questions users can click                 |
| `title`            | `string`   | No       | Custom title (default: "Have Questions?")             |
| `subtitle`         | `string`   | No       | Custom subtitle                                       |

### Current Implementations

**✅ Services Page** (`/src/app/services/page.tsx`)

- Context: `"services"`
- Example questions about payment, warranties, safety, timelines, licensing

**✅ Booking Page** (`/src/app/booking/page.tsx`)

- Context: `"booking"`
- Example questions about consultations, duration, format, preparation, follow-up

**✅ Careers Page** (`/src/app/careers/page.tsx`)

- Context: `"careers"`
- Example questions about hiring, veteran benefits, pay ranges, application process, growth

---

## 📋 Guidelines

### When to Use ChatbotCTASection

✅ **USE for:**

- FAQ sections on service pages
- Question prompts on booking/consultation pages
- Career inquiry sections
- Any "common questions" section
- Areas where users need personalized guidance

❌ **DON'T USE for:**

- Simple informational content (use regular text)
- Legal/policy text (must be exact, no AI interpretation)
- Process steps (use numbered lists instead)
- Contact information display (use static cards)
- Simple facts that don't require context

### Example Questions Best Practices

When creating example questions:

1. **Make them specific**: "What are your payment terms?" not "Tell me about payment"
2. **Use natural language**: Write how real users would ask
3. **Cover different topics**: Don't make all 5 questions about the same thing
4. **Include common concerns**: Safety, cost, timeline, quality, process
5. **Keep them concise**: 5-10 words per question

**Good Examples:**

- "What are your payment terms?"
- "Do you offer warranties on your work?"
- "What's your safety record?"
- "How long do projects typically take?"
- "Are you licensed and insured?"

**Bad Examples:**

- "Tell me everything about your company" (too broad)
- "Payment" (not a question)
- "Can you help me?" (too vague)

---

## 🔄 FAQ Data Repurposing

### Don't Delete FAQ Data

The existing FAQ data in `/src/lib/data/faqs.ts` is **still valuable** and should NOT be deleted. Instead, repurpose it for:

1. **Chatbot Training**: Use FAQ answers to train chatbot responses
2. **Example Questions**: Generate example question lists from FAQ questions
3. **Knowledge Base**: Create structured knowledge articles
4. **Content Audit**: Identify common user concerns and information needs
5. **Chatbot Personality**: Inform tone, style, and level of detail in responses

### Migration Path

When you find a static FAQ section:

1. **Identify**: Note the page and FAQ content
2. **Extract**: Copy the questions into an example questions array
3. **Replace**: Swap `<FAQAccordionSection>` with `<ChatbotCTASection>`
4. **Preserve**: Keep FAQ data in faqs.ts for chatbot training
5. **Test**: Verify chatbot opens with correct context

---

## 📊 Benefits & Metrics

### User Experience Benefits

- **Faster Resolution**: Get answers in 1-2 seconds vs. scrolling through FAQs
- **Personalized Help**: Answers tailored to user's specific situation
- **Conversational**: Natural back-and-forth vs. static text
- **Always Available**: 24/7 instant responses
- **Follow-up Questions**: Can ask clarifications immediately

### Business Benefits

- **Higher Engagement**: Interactive elements increase time on site
- **Lead Capture**: Collect contact info during conversations
- **Better Data**: Track what users actually want to know
- **Lower Support Load**: Chatbot handles common questions 24/7
- **Easier Scaling**: Add new pages without creating new FAQs
- **Improved Conversion**: Direct path from question to booking/application

### Maintenance Benefits

- **Single Source of Truth**: Update chatbot training once
- **No FAQ Duplication**: Don't maintain FAQs on multiple pages
- **Faster Updates**: Change chatbot responses centrally
- **Version Control**: Track chatbot training history
- **Testing**: Test chatbot responses in isolation

---

## 🎓 Developer Guidelines

### Adding Chatbot CTAs to New Pages

1. **Import the component:**

   ```tsx
   import { ChatbotCTASection } from "@/components/chatbot";
   ```

2. **Add to page layout** (typically before footer):

   ```tsx
   <ChatbotCTASection
     context="your-page-name"
     exampleQuestions={[
       "Question 1?",
       "Question 2?",
       "Question 3?",
       "Question 4?",
       "Question 5?",
     ]}
   />
   ```

3. **Choose 4-6 example questions** relevant to the page context

4. **Set context** to match the page (e.g., "about", "projects", "trade-partners")

### Component Structure

The `ChatbotCTASection` component includes:

- **Header**: "Have Questions?" title + subtitle
- **Example Questions**: Clickable question buttons that open chatbot
- **Trust Indicators**: "24/7 Availability", "Instant Responses", "Personalized Help"
- **Alternative Contact**: Phone, email, booking link fallbacks
- **Visual Design**: Brand colors, icons, responsive layout

### Integration with GlobalChatbotProvider

The component uses the `useGlobalChatbot` hook to:

1. Access `setIsVisible()` to open the chatbot
2. Access `setFormData()` to pre-populate context
3. Set initial message when user clicks a question

```tsx
const handleAskQuestion = (question: string) => {
  setFormData({ initialMessage: question, context: context });
  setIsVisible(true);
};
```

---

## 🔮 Future Enhancements

### Potential Improvements

1. **Dynamic Questions**: Generate example questions based on page content
2. **A/B Testing**: Test different question sets for conversion
3. **Analytics Dashboard**: Track most-clicked questions per page
4. **Smart Suggestions**: Recommend questions based on user behavior
5. **Conversation Starters**: Add context-specific greeting messages
6. **FAQ Hybrid**: Show top 3 FAQs + chatbot CTA for complex questions
7. **Multilingual**: Support example questions in multiple languages

### Chatbot Training

As we collect user questions through the chatbot:

1. **Identify Patterns**: Which questions are most common?
2. **Improve Responses**: Refine chatbot answers based on user feedback
3. **Update Examples**: Replace low-performing questions with better ones
4. **Expand Knowledge**: Add new topics based on user inquiries
5. **Measure Success**: Track resolution rate, satisfaction, conversion

---

## 📖 Related Documentation

- **[Consistency Guide - Chatbot Section](./consistency-guide.md#chatbot-first-user-engagement)**
- **[Development Standards - Chatbot Standard](./development-standards.md)**
- **[AI Development Guidelines - Chatbot Rules](./ai-development-guidelines.md#chatbot-first-user-engagement-new---november-2025)**
- **[MasterIndex - Chatbot Strategy](../master-index.md)**
- **[GlobalChatbotProvider Documentation](../../src/providers/GlobalChatbotProvider.tsx)**

---

## ✅ Checklist for New Pages

When adding chatbot engagement to a new page:

- [ ] Import `ChatbotCTASection` from `@/components/chatbot`
- [ ] Choose 4-6 example questions relevant to page context
- [ ] Set `context` prop to page identifier (e.g., "about", "projects")
- [ ] Place component before footer, after main content
- [ ] Test: Click each example question to verify chatbot opens
- [ ] Test: Verify chatbot receives correct context
- [ ] Test: Check mobile responsiveness
- [ ] Document: Add to this file's "Current Implementations" section

---

## 📝 Version History

| Version | Date       | Changes                                               |
| ------- | ---------- | ----------------------------------------------------- |
| 1.0.0   | 2025-11-08 | Initial strategy document                             |
|         |            | Documented Services, Booking, Careers implementations |
|         |            | Established guidelines and best practices             |

---

**Questions about this strategy?** Ask in the chatbot! 😉
