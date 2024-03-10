use bevy::prelude::*;

#[derive(Component)]
struct Person;

#[derive(Component)]
struct Name(String);

fn main() {
    App::new()
        .add_systems(Startup, add_people)
        .add_systems(Update, (hello_world, (update_people, greet_people).chain()))
        .run();
}

fn add_people(mut commands: Commands) {
    commands.spawn((Person, Name("Elaina".to_string())));
    commands.spawn((Person, Name("John".to_string())));
    commands.spawn((Person, Name("Danny".to_string())));
}

fn hello_world() {
    println!("Hello world!");
}
fn greet_people(query: Query<&Name, With<Person>>) {
    for name in &query {
        println!("hello {}!", name.0);
    }
}
fn update_people(mut query: Query<&mut Name, With<Person>>) {
    for mut name in &mut query {
        if name.0 == "Elaina" {
            name.0 = "Yeetmeister".to_string();
            break;
        }
    }
}
