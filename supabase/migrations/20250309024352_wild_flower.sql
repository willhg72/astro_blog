/*
  # Create comments table

  1. New Tables
    - `comments`
      - `id` (uuid, primary key)
      - `post_id` (text, not null) - ID of the blog post
      - `email` (text, not null) - Email of the commenter
      - `content` (text, not null) - Comment content
      - `created_at` (timestamp with timezone, default: now())

  2. Security
    - Enable RLS on `comments` table
    - Add policies for:
      - Anyone can read comments
      - Anyone can create comments
*/

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id text NOT NULL,
  email text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read comments
CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to create comments
CREATE POLICY "Anyone can create comments"
  ON comments
  FOR INSERT
  TO public
  WITH CHECK (true);