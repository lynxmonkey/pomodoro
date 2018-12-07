variable "domain" {
  default = "pomodoro.increaser.org"
}

variable "bucket_name" {
  default = "tf-pomodoro"
}

variable "region" { }

variable "access_key" { }

variable "secret_key" { }

variable "ci_container_name" {
  default = "geekrodion"
}

variable "repo_owner" {
  default = "RodionChachura"
}

variable "repo_name" {
  default = "pomodoro"
}

variable "branch" {
  default = "master"
}