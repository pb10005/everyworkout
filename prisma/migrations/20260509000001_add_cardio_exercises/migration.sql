-- Add aerobic/cardio exercise category and exercises

INSERT INTO "BodyPart" ("name") VALUES ('有酸素運動');

INSERT INTO "Muscle" ("name", "name_kana", "bodyPartId")
  SELECT '全身', 'ぜんしん', id FROM "BodyPart" WHERE name = '有酸素運動';

INSERT INTO "Exercise" ("name") VALUES
  ('ランニング'),
  ('ウォーキング'),
  ('サイクリング'),
  ('水泳'),
  ('ロープジャンプ'),
  ('エアロバイク'),
  ('ローイングマシン');

INSERT INTO "ExerciseMuscle" ("exerciseId", "muscleId", "is_main")
  SELECT e.id, m.id, true
  FROM "Exercise" e, "Muscle" m
  WHERE e.name IN (
    'ランニング', 'ウォーキング', 'サイクリング', '水泳',
    'ロープジャンプ', 'エアロバイク', 'ローイングマシン'
  )
  AND m.name = '全身';
