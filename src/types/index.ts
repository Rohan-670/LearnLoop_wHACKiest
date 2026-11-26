export type Role = "student" | "teacher" | "administrator";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  locale: Locale;
  is_active: boolean;
  created_at: string;
};

export type StudentProfile = {
  user_id: string;
  grade: string;
  learning_dna: LearningDNA;
  created_at: string;
  updated_at: string;
};

export type Teacher = {
  user_id: string;
  employee_id: string;
  subjects: string[];
  classes: string[];
};

export type Class = {
  id: string;
  name: string;
  grade: string;
  teacher_id: string;
  school: string;
  created_at: string;
};

export type ClassMember = {
  id: string;
  class_id: string;
  user_id: string;
  role: "student";
  joined_at: string;
};

export type Subject = {
  id: string;
  code: string;
  name: string;
  description: string;
};

export type Topic = {
  id: string;
  subject_id: string;
  name: string;
  description: string;
  order: number;
};

export type Lesson = {
  id: string;
  topic_id: string;
  title: string;
  description: string;
  content: LessonContent;
  version: number;
  is_published: boolean;
  data_size_kb: number;
  created_at: string;
  updated_at: string;
};

export type LessonContent = {
  explanation: string;
  worked_examples: WorkedExample[];
  diagrams: Diagram[];
  misconceptions: MisconceptionRule[];
  remedial_activity: string;
};

export type WorkedExample = {
  id: string;
  problem: string;
  solution: string;
  steps: string[];
};

export type Diagram = {
  id: string;
  type: "svg" | "image";
  src: string;
  alt: string;
  caption: string;
};

export type Question = {
  id: string;
  lesson_id: string;
  topic_id: string;
  type: "multiple_choice" | "short_answer";
  question_text: string;
  options?: QuestionOption[];
  correct_answer: string;
  explanation: string;
  difficulty: number;
  misconception_id?: string;
};

export type QuestionOption = {
  id: string;
  question_id: string;
  text: string;
  is_correct: boolean;
};

export type MisconceptionRule = {
  id: string;
  subject: string;
  topic: string;
  concept: string;
  incorrect_pattern: string;
  likely_reasoning: string;
  correct_explanation: string;
  remedial_activity: string;
  follow_up_question: string;
  confidence_threshold: number;
};

export type MisconceptionEvent = {
  id: string;
  attempt_id: string;
  misconception_id: string;
  confidence: number;
  detected_at: string;
};

export type Attempt = {
  id: string;
  user_id: string;
  lesson_id: string;
  question_id: string;
  answer: string;
  is_correct: boolean;
  misconception_id?: string;
  misconception_confidence?: number;
  time_spent_seconds: number;
  created_at: string;
  synced: boolean;
  event_id: string;
  version: number;
};

export type MasteryRecord = {
  id: string;
  user_id: string;
  topic_id: string;
  mastery_score: number;
  recent_accuracy: number;
  retention_score: number;
  attempts_count: number;
  last_attempt_at: string;
  updated_at: string;
};

export type Assignment = {
  id: string;
  class_id: string;
  teacher_id: string;
  lesson_id: string;
  title: string;
  due_date: string;
  is_published: boolean;
  created_at: string;
};

export type Download = {
  id: string;
  user_id: string;
  lesson_id: string;
  downloaded_at: string;
  size_kb: number;
};

export type SyncEvent = {
  id: string;
  event_id: string;
  entity_type: string;
  entity_id: string;
  action: "create" | "update" | "delete";
  status: "pending" | "synced" | "failed";
  created_at: string;
  synced_at?: string;
  retry_count: number;
};

export type TeacherIntervention = {
  id: string;
  class_id: string;
  teacher_id: string;
  topic_id: string;
  title: string;
  description: string;
  recommended_activity: string;
  follow_up_assessment: string;
  status: "pending" | "approved" | "dismissed";
  ai_generated: boolean;
  created_at: string;
};

export type AiInteraction = {
  id: string;
  user_id: string;
  type: string;
  prompt: string;
  response: string;
  model: string;
  created_at: string;
};

export type LearningDNA = {
  topic_mastery: Record<string, number>;
  concept_mastery: Record<string, number>;
  repeated_mistakes: string[];
  identified_misconceptions: string[];
  retention_over_time: Array<{ date: string; score: number }>;
  learning_pace: number;
  practice_completion: number;
  improvement_after_remediation: number;
  recommended_next_activity: string;
};

export type Locale = "en" | "kn";

export type DataMode = "saver" | "balanced" | "rich";

export type ConnectionStatus = "online" | "offline" | "unknown";

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};
