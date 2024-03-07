+++
title = "[utils]常用crate"
date = 2024-03-07

[taxonomies]
tags = ["rust", "utils", "crate"]

[extra]
description = "Some rust crates about utils"
banner = "/static/crate/logo.png"
+++

搜集一些rust开发中常用的crates

<!-- more -->

## Utils

#### validator

Macros 1.1 custom derive to simplify struct validation inspired by marshmallow and Django validators.

```rust
use serde::Deserialize;

// A trait that the Validate derive will impl
use validator::{Validate, ValidationError};

#[derive(Debug, Validate, Deserialize)]
struct SignupData {
    #[validate(email)]
    mail: String,
    #[validate(url)]
    site: String,
    #[validate(length(min = 1), custom = "validate_unique_username")]
    #[serde(rename = "firstName")]
    first_name: String,
    #[validate(range(min = 18, max = 20))]
    age: u32,
    #[validate(range(exclusive_min = 0.0, max = 100.0))]
    height: f32,
}

fn validate_unique_username(username: &str) -> Result<(), ValidationError> {
    if username == "xXxShad0wxXx" {
        // the value of the username will automatically be added later
        return Err(ValidationError::new("terrible_username"));
    }

    Ok(())
}

match signup_data.validate() {
  Ok(_) => (),
  Err(e) => return e;
};
```

#### lettre

A mailer library for Rust.

```rust
use lettre::message::header::ContentType;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};

let email = Message::builder()
    .from("NoBody <nobody@domain.tld>".parse().unwrap())
    .reply_to("Yuin <yuin@domain.tld>".parse().unwrap())
    .to("Hei <hei@domain.tld>".parse().unwrap())
    .subject("Happy new year")
    .header(ContentType::TEXT_PLAIN)
    .body(String::from("Be happy!"))
    .unwrap();

let creds = Credentials::new("smtp_username".to_owned(), "smtp_password".to_owned());

// Open a remote connection to gmail
let mailer = SmtpTransport::relay("smtp.gmail.com")
    .unwrap()
    .credentials(creds)
    .build();

// Send the email
match mailer.send(&email) {
    Ok(_) => println!("Email sent successfully!"),
    Err(e) => panic!("Could not send email: {e:?}"),
}
```

#### diesel

A safe, extensible ORM and Query Builder for Rust.

Origin Code

```rust
let versions = Version::belonging_to(krate)
  .select(id)
  .order(num.desc())
  .limit(5);
let downloads = version_downloads
  .filter(date.gt(now - 90.days()))
  .filter(version_id.eq_any(versions))
  .order(date)
  .load::<Download>(&mut conn)?;
```

Executed SQL

```sql
SELECT version_downloads.*
  WHERE date > (NOW() - '90 days')
    AND version_id = ANY(
      SELECT id FROM versions
        WHERE crate_id = 1
        ORDER BY num DESC
        LIMIT 5
    )
  ORDER BY date
```

#### reqwest

An ergonomic, batteries-included HTTP Client for Rust.

```rust
use std::collections::HashMap;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let resp = reqwest::get("https://httpbin.org/ip")
        .await?
        .json::<HashMap<String, String>>()
        .await?;
    println!("{resp:#?}");
    Ok(())
}
```

#### shadow-rs

shadow-rs allows you to access properties of the build process and environment at runtime.

```rust
fn main(){
    println!("debug:{}", shadow_rs::is_debug()); // check if this is a debug build. e.g 'true/false'
    println!("branch:{}", shadow_rs::branch()); // get current project branch. e.g 'master/develop'
    println!("tag:{}", shadow_rs::tag()); // get current project tag. e.g 'v1.3.5'
    println!("git_clean:{}", shadow_rs::git_clean()); // get current project clean. e.g 'true/false'
    println!("git_status_file:{}", shadow_rs::git_status_file()); // get current project statue file. e.g '  * examples/builtin_fn.rs (dirty)'

    println!("{}", build::VERSION); //print version const
    println!("{}", build::CLAP_LONG_VERSION); //print CLAP_LONG_VERSION const
    println!("{}", build::BRANCH); //master
    println!("{}", build::SHORT_COMMIT);//8405e28e
    println!("{}", build::COMMIT_HASH);//8405e28e64080a09525a6cf1b07c22fcaf71a5c5
    println!("{}", build::COMMIT_DATE);//2021-08-04 12:34:03 +00:00
    println!("{}", build::COMMIT_AUTHOR);//baoyachi
    println!("{}", build::COMMIT_EMAIL);//xxx@gmail.com

    println!("{}", build::BUILD_OS);//macos-x86_64
    println!("{}", build::RUST_VERSION);//rustc 1.45.0 (5c1f21c3b 2020-07-13)
    println!("{}", build::RUST_CHANNEL);//stable-x86_64-apple-darwin (default)
    println!("{}", build::CARGO_VERSION);//cargo 1.45.0 (744bd1fbb 2020-06-15)
    println!("{}", build::PKG_VERSION);//0.3.13
    println!("{}", build::CARGO_TREE); //like command:cargo tree
    println!("{}", build::CARGO_MANIFEST_DIR); // /User/baoyachi/shadow-rs/ |

    println!("{}", build::PROJECT_NAME);//shadow-rs
    println!("{}", build::BUILD_TIME);//2020-08-16 14:50:25
    println!("{}", build::BUILD_RUST_CHANNEL);//debug
    println!("{}", build::GIT_CLEAN);//false
    println!("{}", build::GIT_STATUS_FILE);//* src/lib.rs (dirty)
}
```

#### chrono

Chrono aims to provide all functionality needed to do correct operations on dates and times.

```rust
use chrono::prelude::*;

let local: DateTime<Local> = Local::now(); // e.g. `2014-11-28T21:45:59.324310806+09:00`
```

#### cron

A cron expression parser. Works with stable Rust v1.28.0.

```rust
use cron::Schedule;
use chrono::Utc;
use std::str::FromStr;

fn main() {
  //               sec  min   hour   day of month   month   day of week   year
  let expression = "0   30   9,12,15     1,15       May-Aug  Mon,Wed,Fri  2018/2";
  let schedule = Schedule::from_str(expression).unwrap();
  println!("Upcoming fire times:");
  for datetime in schedule.upcoming(Utc).take(10) {
    println!("-> {}", datetime);
  }
}

/*
Upcoming fire times:
-> 2018-06-01 09:30:00 UTC
-> 2018-06-01 12:30:00 UTC
-> 2018-06-01 15:30:00 UTC
-> 2018-06-15 09:30:00 UTC
-> 2018-06-15 12:30:00 UTC
-> 2018-06-15 15:30:00 UTC
-> 2018-08-01 09:30:00 UTC
-> 2018-08-01 12:30:00 UTC
-> 2018-08-01 15:30:00 UTC
-> 2018-08-15 09:30:00 UTC
*/
```

#### env_logger

Implements a logger that can be configured via environment variables.

```rust
use log::info;

fn main() {
    env_logger::init();

    info!("starting up");

    // ...
}
```

#### lazy_static

A macro for declaring lazily evaluated statics in Rust.

```rust
use lazy_static::lazy_static;
use std::collections::HashMap;

lazy_static! {
    static ref HASHMAP: HashMap<u32, &'static str> = {
        let mut m = HashMap::new();
        m.insert(0, "foo");
        m.insert(1, "bar");
        m.insert(2, "baz");
        m
    };
}

fn main() {
    // First access to `HASHMAP` initializes it
    println!("The entry for `0` is \"{}\".", HASHMAP.get(&0).unwrap());

    // Any further access to `HASHMAP` just returns the computed value
    println!("The entry for `1` is \"{}\".", HASHMAP.get(&1).unwrap());
}
```

#### rust_embed

Rust Custom Derive Macro which loads files into the rust binary at compile time during release and loads the file from the fs during dev.

```rust
#[derive(RustEmbed)]
#[folder = "examples/public/"]
struct Asset;
```
