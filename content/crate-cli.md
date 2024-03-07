+++
title = "[cli]常用crate"
date = 2024-03-07

[taxonomies]
tags = ["rust", "cli", "crate"]
+++

搜集一些rust开发中常用的crates

<!-- more -->

## Cli

#### clap

Create your command-line parser, with all of the bells and whistles, declaratively or procedurally.

```rust
use clap::Parser;

/// Simple program to greet a person
#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    /// Name of the person to greet
    #[arg(short, long)]
    name: String,

    /// Number of times to greet
    #[arg(short, long, default_value_t = 1)]
    count: u8,
}

fn main() {
    let args = Args::parse();

    for _ in 0..args.count {
        println!("Hello {}!", args.name)
    }
}
```

#### structopt

Parse command line arguments by defining a struct. It combines clap with custom derive.

```rust
use std::path::PathBuf;
use structopt::StructOpt;

/// A basic example
#[derive(StructOpt, Debug)]
#[structopt(name = "basic")]
struct Opt {
    // A flag, true if used in the command line. Note doc comment will
    // be used for the help message of the flag. The name of the
    // argument will be, by default, based on the name of the field.
    /// Activate debug mode
    #[structopt(short, long)]
    debug: bool,

    // The number of occurrences of the `v/verbose` flag
    /// Verbose mode (-v, -vv, -vvv, etc.)
    #[structopt(short, long, parse(from_occurrences))]
    verbose: u8,

    /// Set speed
    #[structopt(short, long, default_value = "42")]
    speed: f64,

    /// Output file
    #[structopt(short, long, parse(from_os_str))]
    output: PathBuf,

    // the long option will be translated by default to kebab case,
    // i.e. `--nb-cars`.
    /// Number of cars
    #[structopt(short = "c", long)]
    nb_cars: Option<i32>,

    /// admin_level to consider
    #[structopt(short, long)]
    level: Vec<String>,

    /// Files to process
    #[structopt(name = "FILE", parse(from_os_str))]
    files: Vec<PathBuf>,
}

fn main() {
    let opt = Opt::from_args();
    println!("{:#?}", opt);
}
```

#### indicatif

A Rust library for indicating progress in command line applications to users.

```rust
use std::thread;
use std::time::Duration;

use indicatif::ProgressBar;

fn main() {
    let pb = ProgressBar::new(1024);
    for _ in 0..1024 {
        thread::sleep(Duration::from_millis(5));
        pb.inc(1);
    }
    pb.finish_with_message("done");
}
```

#### colored

Coloring terminal so simple, you already know how to do it!

```rust
extern crate colored; // not needed in Rust 2018+

use colored::Colorize;

// test the example with `cargo run --example most_simple`
fn main() {
    // TADAA!
    println!("{} {} !", "it".green(), "works".blue().bold());
}
```

#### term-table

CLI Tables Made Easy.

```rust
use rand::Rng;
use term_table::{row, row::Row, rows, table_cell::*, Table, TableStyle};

fn main() {
    let mut rng = rand::thread_rng();
    let num_draws = 5;
    let num_numbers = 6;
    let range = 1..=99;

    let mut table = Table::builder()
        .rows(rows![row!(TableCell::builder("My Lucky Numbers")
            .alignment(Alignment::Center)
            .col_span(num_numbers))])
        .style(TableStyle::elegant())
        .build();

    for _ in 0..num_draws {
        let mut row = Row::empty();
        for _ in 0..num_numbers {
            let num: i32 = rng.gen_range(range.clone());
            row.add_cell(TableCell::new(num.to_string()));
        }
        table.add_row(row);
    }

    println!("{}", table.render());
}
```

#### comfy-table

Comfy-table is designed as a library for building beautiful terminal tables, while being easy to use.

```rust
use comfy_table::Table;

fn main() {
    let mut table = Table::new();
    table
        .set_header(vec!["Header1", "Header2", "Header3"])
        .add_row(vec![
            "This is a text",
            "This is another text",
            "This is the third text",
        ])
        .add_row(vec![
            "This is another text",
            "Now\nadd some\nmulti line stuff",
            "This is awesome",
        ]);

    println!("{table}");
}
```
