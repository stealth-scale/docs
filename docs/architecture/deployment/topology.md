---
title: Topology
description: What is deployed where, who operates each part, and where each building block runs.
sidebar:
  order: 1
---

## Overview

Draw a C4 deployment diagram. Show the nodes and the connections between them.

## Why it is deployed this way

Say why the parts sit where they do. Name the quality goal each choice serves.

## The nodes

| Node | What runs on it | Who operates it | How it scales |
| ---- | --------------- | --------------- | ------------- |
|      |                 |                 |               |

## Building blocks by node

Add one row per container from [Containers](../building-blocks/containers.md).

| Container | Node | How many instances |
| --------- | ---- | ------------------ |
|           |      |                    |

## Networking and trust zones

Say which nodes can reach which. Say where the trust boundaries are.
