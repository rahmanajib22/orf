-- إضافة عمود "متميز" لجدول المدرسين ليظهروا في أول النتائج
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- مثال لكيفية تمييز مدرسين معينين (يمكنك فعل ذلك من لوحة سوبابيس أيضاً)
-- UPDATE profiles SET is_featured = true WHERE name LIKE '%محمود%';
