<template>
  <div class="markdown-content" :class="{ 'ai-markdown': isAiMessage }">
    <div v-html="renderedContent"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  typographer: true,
});

const defaultLinkOpenRenderer =
  md.renderer.rules.link_open ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];

  token.attrSet("target", "_blank");
  token.attrSet("rel", "noopener noreferrer nofollow");

  return defaultLinkOpenRenderer(tokens, idx, options, env, self);
};

md.renderer.rules.code_inline = (tokens, idx) => {
  return `<code class="inline-code">${md.utils.escapeHtml(tokens[idx].content)}</code>`;
};

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const lang = token.info ? ` language-${md.utils.escapeHtml(token.info.trim())}` : "";

  return `<pre class="code-block"><code class="${lang.trim()}">${md.utils.escapeHtml(token.content)}</code></pre>`;
};

md.renderer.rules.code_block = (tokens, idx) => {
  return `<pre class="code-block"><code>${md.utils.escapeHtml(tokens[idx].content)}</code></pre>`;
};

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  isAiMessage: {
    type: Boolean,
    default: false,
  },
});

const renderedContent = computed(() => {
  const html = md.render(props.content || "");

  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });
});
</script>

<style scoped>
.markdown-content {
  line-height: 1.6;
  color: inherit;
  word-break: break-word;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  margin: 1em 0 0.5em 0;
  font-weight: 600;
  line-height: 1.3;
}

.markdown-content :deep(h1) {
  font-size: 1.5em;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.3em;
}

.markdown-content :deep(h2) {
  font-size: 1.3em;
  color: #374151;
}

.markdown-content :deep(h3) {
  font-size: 1.1em;
  color: #4b5563;
}

.markdown-content :deep(p) {
  margin: 0.5em 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

.markdown-content :deep(li) {
  margin: 0.3em 0;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #d1d5db;
  margin: 1em 0;
  color: #6b7280;
  font-style: italic;
  background: #f9fafb;
  border-radius: 0 0.5em 0.5em 0;
  padding: 0.5em 1em;
}

.ai-markdown :deep(blockquote) {
  border-left-color: #3b82f6;
  background: #eff6ff;
}

.markdown-content :deep(hr) {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 1.5em 0;
}

.markdown-content :deep(code.inline-code) {
  background: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 0.85em;
  color: #e11d48;
}

.ai-markdown :deep(code.inline-code) {
  background: #dbeafe;
  color: #1e40af;
}

.markdown-content :deep(pre.code-block) {
  background: #1f2937;
  color: #f9fafb;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 1em 0;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 0.85em;
  line-height: 1.4;
}

.markdown-content :deep(pre.code-block code) {
  background: none;
  padding: 0;
  color: inherit;
}

.markdown-content :deep(a) {
  color: #3b82f6;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.markdown-content :deep(a:hover) {
  border-bottom-color: #3b82f6;
}

.ai-markdown :deep(a) {
  color: #1e40af;
}

.ai-markdown :deep(a:hover) {
  border-bottom-color: #1e40af;
}

.markdown-content :deep(strong) {
  font-weight: 600;
  color: #374151;
}

.ai-markdown :deep(strong) {
  color: #1e40af;
}

.markdown-content :deep(em) {
  font-style: italic;
  color: #6b7280;
}
</style>
