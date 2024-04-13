insert into "BodyPart"(name) values ('テスト');

insert into "Muscle"(name, name_kana, description, "bodyPartId") values('僧帽筋', 'そうぼうきん', '', 1);

insert into "Exercise"(name, description) values('ショルダーシュラッグ', '');

insert into "ExerciseMuscle"("exerciseId", "muscleId", is_main) values(1, 1, false);

insert into "Workout"(id, "userId", weight, reps, sets, note, "exerciseId", "weeklyReportPublished") values(2, '1', 50, 10, 3, '', 1, false);