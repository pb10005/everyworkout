-- Add aerobic/cardio exercise category and exercises
-- Reset sequences to max existing IDs to avoid primary key conflicts

SELECT setval('"BodyPart_id_seq"', GREATEST((SELECT MAX(id) FROM "BodyPart"), 1));
SELECT setval('"Muscle_id_seq"', GREATEST((SELECT MAX(id) FROM "Muscle"), 1));
SELECT setval('"Exercise_id_seq"', GREATEST((SELECT MAX(id) FROM "Exercise"), 1));
SELECT setval('"ExerciseMuscle_id_seq"', GREATEST((SELECT MAX(id) FROM "ExerciseMuscle"), 1));

INSERT INTO "BodyPart" ("name")
  SELECT '有酸素運動' WHERE NOT EXISTS (
    SELECT 1 FROM "BodyPart" WHERE name = '有酸素運動'
  );

INSERT INTO "Muscle" ("name", "name_kana", "bodyPartId")
  SELECT '全身', 'ぜんしん', id FROM "BodyPart" WHERE name = '有酸素運動'
  AND NOT EXISTS (
    SELECT 1 FROM "Muscle" WHERE name = '全身'
  );

INSERT INTO "Exercise" ("name")
  SELECT v.name FROM (VALUES
    ('ランニング'),
    ('ウォーキング'),
    ('サイクリング'),
    ('水泳'),
    ('ロープジャンプ'),
    ('エアロバイク'),
    ('ローイングマシン')
  ) AS v(name)
  WHERE NOT EXISTS (
    SELECT 1 FROM "Exercise" WHERE "Exercise".name = v.name
  );

INSERT INTO "ExerciseMuscle" ("exerciseId", "muscleId", "is_main")
  SELECT e.id, m.id, true
  FROM "Exercise" e, "Muscle" m
  WHERE e.name IN (
    'ランニング', 'ウォーキング', 'サイクリング', '水泳',
    'ロープジャンプ', 'エアロバイク', 'ローイングマシン'
  )
  AND m.name = '全身'
  AND NOT EXISTS (
    SELECT 1 FROM "ExerciseMuscle"
    WHERE "exerciseId" = e.id AND "muscleId" = m.id
  );
