/* ============================================================
   NMRA — Question data, scoring, and zones
   v0.1 · May 13, 2026
   Single source of truth. Edit copy here, not in HTML.
   ============================================================ */

window.NMRA_DATA = {

  dimensions: [
    {
      id: "posture",
      name: "Posture",
      prompt: "Where do you actually stand on AI as a leader right now?",
      questions: [
        { text: "I've decided where I stand on AI in my work — not from fear, and not from hype.", reversed: false },
        { text: "AI feels like one more thing I should be doing but haven't gotten to.", reversed: true },
        { text: "I can explain in three sentences what AI is actually for in my organization.", reversed: false },
      ],
      diagnostics: {
        high: "You've settled on where you stand. You're not reactive, not naive. Keep listening to leaders who disagree with you — that's how clarity stays honest.",
        medium: "You're working out where you stand, but the noise around you keeps shifting it. Name your default response, in writing, before you act again.",
        low: "AI is happening TO you right now, not THROUGH you. The first work is not a tool. It's choosing a stance you can defend in your own voice.",
      },
    },
    {
      id: "essence",
      name: "Essence Anchoring",
      prompt: "Are you leading from calling, or reacting to noise?",
      questions: [
        { text: "I can articulate, in one paragraph, the unique calling I'm meant to carry as a leader.", reversed: false },
        { text: "Most of my week is shaped by other people's priorities rather than my own clarity.", reversed: true },
        { text: "When decisions get hard, I return to a clear sense of what I'm here to do.", reversed: false },
      ],
      diagnostics: {
        high: "You lead from calling, and others feel it. The risk is forgetting that the next mountain may require new language for the same essence.",
        medium: "Your calling is real but quiet. It rarely makes the operating decisions. The work is to bring it forward into Tuesday.",
        low: "You're operating from role, not essence. Until you can name what you alone are made to carry, every AI decision will be reactive.",
      },
    },
    {
      id: "vision",
      name: "Vision Clarity",
      prompt: "Is your preferred future written, specific, and constraining your choices?",
      questions: [
        { text: "I have a clear, written picture of what my organization needs to look like 18 months from now.", reversed: false },
        { text: "If 30% of my role were transformed by AI in the next year, I have a plan for what I'd do.", reversed: false },
        { text: "I know what 'doing less' would look like for me — and what I'd stop doing.", reversed: false },
      ],
      diagnostics: {
        high: "You can see 18 months out and you're saying no to the right things. Sharpen the picture quarterly; it ages faster than it used to.",
        medium: "You have a fuzzy direction but no constraining vision. Without specifics, AI becomes a productivity demand instead of a leverage choice.",
        low: "There's no written, shared vision driving your week. Until there is, AI will multiply busyness, not impact.",
      },
    },
    {
      id: "discernment",
      name: "Discernment",
      prompt: "Do you understand the times AND know what to do?",
      questions: [
        { text: "I understand the underlying shift AI represents, not just the tools.", reversed: false },
        { text: "I can distinguish AI signal from AI noise in my industry.", reversed: false },
        { text: "I know two or three specific moves I should make in the next 90 days.", reversed: false },
      ],
      diagnostics: {
        high: "You read the times well and you've named your moves. The remaining risk is moving too slowly because the read is too complete.",
        medium: "You understand the shift; you don't yet know what to do with it. That is the Issachar gap — most leaders die in it.",
        low: "You're consuming AI content, not understanding it. The first move is not another podcast. It is sitting with one question until it changes your decisions.",
      },
    },
    {
      id: "humanAdvantage",
      name: "Human Advantage",
      prompt: "Have you clarified what only you can do — and what AI cannot?",
      questions: [
        { text: "I have a clear list of the leadership work that only I can do.", reversed: false },
        { text: "I know which parts of my role should be delegated, automated, or eliminated.", reversed: false },
        { text: "My team knows what to bring to me — and what not to.", reversed: false },
      ],
      diagnostics: {
        high: "You've claimed your unique work and protected it. Keep auditing it; the line moves every six months.",
        medium: "You sense what only you can do but you haven't written it down. Without the list, you'll keep saying yes to work that should leave you.",
        low: "You're carrying work that does not require you. Until you name what only you can do, AI will free up time you won't actually use well.",
      },
    },
    {
      id: "leverage",
      name: "Leverage",
      prompt: "Have you identified the highest-leverage AI moves — and the things you will NOT do?",
      questions: [
        { text: "I've identified the two or three highest-leverage places AI could change my organization.", reversed: false },
        { text: "I have at least one AI-enabled workflow producing real value in my work today.", reversed: false },
        { text: "I am clear about what I will NOT do with AI — and why.", reversed: false },
      ],
      diagnostics: {
        high: "You've made deliberate AI bets and you can defend the stop-list. Most leaders never get here.",
        medium: "You have ideas but no committed bets. The risk is breadth without depth — many pilots, no production.",
        low: "AI hasn't yet produced real leverage in your work. The first move is one workflow, one outcome, one month.",
      },
    },
    {
      id: "teamTrust",
      name: "Team Trust",
      prompt: "Does your team know how you think about AI — or are they guessing?",
      questions: [
        { text: "My team knows exactly how I think about AI — they don't have to guess.", reversed: false },
        { text: "I've had at least one substantive conversation with my team about how AI will shape our work.", reversed: false },
        { text: "My direct reports trust me to lead them through technology change well.", reversed: false },
      ],
      diagnostics: {
        high: "Your team knows where you stand and trusts your judgment. That trust is your most underrated asset right now.",
        medium: "Your team is guessing what you think. Some are over-deploying AI, others are hiding it. Both are signs of unspoken posture.",
        low: "AI is happening in your organization without your leadership. The longer this continues, the harder the trust gap is to close.",
      },
    },
    {
      id: "stewardship",
      name: "Stewardship Rhythm",
      prompt: "Do you have weekly rhythms that keep you clear under sustained pressure?",
      questions: [
        { text: "I have weekly rhythms — rest, reflection, real time to think — that keep me clear under pressure.", reversed: false },
        { text: "I am chronically overwhelmed by how much information comes at me each week.", reversed: true },
        { text: "I am growing what matters most — not just growing for its own sake.", reversed: false },
      ],
      diagnostics: {
        high: "You have rhythms that sustain clear thinking. Protect them aggressively; they will be the first thing the next mountain attacks.",
        medium: "Your rhythms are intermittent. Under sustained pressure, they break first and clarity goes with them.",
        low: "You're running without rhythm. The leadership AI calls for cannot be sustained from depletion.",
      },
    },
  ],

  // Total-score zones (24–120 range)
  zones: [
    {
      min: 24, max: 48,
      name: "Reactive Curiosity",
      diagnostic: "You sense the ground is moving, but you haven't formed a posture yet. AI shows up as one more thing — exciting at moments, exhausting at others. Right now you're reacting to it more than leading through it.",
    },
    {
      min: 49, max: 72,
      name: "Aware but Adrift",
      diagnostic: "You see the mountain clearly. You don't yet have a map. You've absorbed enough to know AI is a generational shift, but the path from awareness to action is fogged. A few more inputs won't fix that — clarity will.",
    },
    {
      min: 73, max: 96,
      name: "Mapping the Climb",
      diagnostic: "You're forming a real response. You have some convictions, some moves identified, some pieces in motion. The gap now is integration — pulling vision, team, and tools into one coherent stride. This is where most leaders get stuck without peers.",
    },
    {
      min: 97, max: 120,
      name: "Leading from Calling",
      diagnostic: "You're operating from essence, not anxiety. You've made hard calls about what only you can do, what to delegate, and what to leave behind. You're not here to be convinced — you're here to refine, and to lead alongside leaders doing the same.",
    },
  ],

  scoring: {
    scoreItem(value, reversed) {
      const v = Number(value);
      return reversed ? (6 - v) : v;
    },
    band(dimensionScore) {
      if (dimensionScore >= 12) return "high";
      if (dimensionScore >= 8)  return "medium";
      return "low";
    },
    zoneFor(total) {
      return window.NMRA_DATA.zones.find(z => total >= z.min && total <= z.max);
    },
  },
};
